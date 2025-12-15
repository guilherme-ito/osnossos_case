import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonButtons,
  IonBackButton,
  IonList,
  IonToggle,
  IonDatetime
} from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../services/task.service';
import { Task, TaskStatus } from '../models/task.model';
import { ToastController, LoadingController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.page.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonSelect,
    IonSelectOption,
    IonButtons,
    IonBackButton,
    IonList,
    IonToggle,
    IonDatetime
  ],
})
export class TaskFormPage implements OnInit {
  taskForm: FormGroup;
  taskId: number | null = null;
  isEditMode = false;
  minDate: string;
  statusOptions: { value: TaskStatus; label: string }[] = [
    { value: 'pending', label: 'Pendente' },
    { value: 'in_progress', label: 'Em Andamento' },
    { value: 'completed', label: 'Concluída' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {
    // Define a data mínima como hoje
    this.minDate = new Date().toISOString().split('T')[0];
    
    this.taskForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      description: ['', [Validators.maxLength(1000)]],
      status: ['pending', Validators.required],
      isFavorite: [false],
      dueDate: [null]
    });
  }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.taskId = parseInt(id, 10);
      this.isEditMode = true;
      await this.loadTask();
    }
  }

  async loadTask() {
    if (!this.taskId) return;

    const loading = await this.loadingController.create({
      message: 'Carregando tarefa...'
    });
    await loading.present();

    try {
      const task = await firstValueFrom(this.taskService.getTaskById(this.taskId));
      if (task) {
        const dueDate = task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : null;
        this.taskForm.patchValue({
          title: task.title,
          description: task.description || '',
          status: task.status,
          isFavorite: task.isFavorite || false,
          dueDate: dueDate
        });
      }
    } catch (error: any) {
      this.showToast('Erro ao carregar tarefa: ' + error.message, 'danger');
      this.router.navigate(['/tasks']);
    } finally {
      await loading.dismiss();
    }
  }

  async onSubmit() {
    if (this.taskForm.invalid) {
      this.showToast('Por favor, preencha todos os campos obrigatórios', 'warning');
      return;
    }

    const loading = await this.loadingController.create({
      message: this.isEditMode ? 'Atualizando tarefa...' : 'Criando tarefa...'
    });
    await loading.present();

    try {
      const formValue = this.taskForm.value;
      
      const dueDateValue = formValue.dueDate ? new Date(formValue.dueDate).toISOString() : null;
      
      if (this.isEditMode && this.taskId) {
        await firstValueFrom(this.taskService.updateTask(this.taskId, {
          title: formValue.title,
          description: formValue.description || null,
          status: formValue.status,
          isFavorite: formValue.isFavorite || false,
          dueDate: dueDateValue
        }));
        this.showToast('Tarefa atualizada com sucesso!', 'success');
      } else {
        await firstValueFrom(this.taskService.createTask({
          title: formValue.title,
          description: formValue.description || null,
          status: formValue.status,
          isFavorite: formValue.isFavorite || false,
          dueDate: dueDateValue
        }));
        this.showToast('Tarefa criada com sucesso!', 'success');
      }
      
      this.router.navigate(['/tasks']);
    } catch (error: any) {
      this.showToast('Erro ao salvar tarefa: ' + error.message, 'danger');
    } finally {
      await loading.dismiss();
    }
  }

  async showToast(message: string, color: 'success' | 'danger' | 'warning' = 'success') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'bottom'
    });
    await toast.present();
  }
}
