import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonList, 
  IonItem, 
  IonLabel, 
  IonButton, 
  IonIcon,
  IonFab,
  IonFabButton,
  IonRefresher,
  IonRefresherContent,
  IonBadge,
  IonButtons,
  IonSpinner,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonToggle
} from '@ionic/angular/standalone';
import { AlertController, ToastController, LoadingController, ActionSheetController } from '@ionic/angular';
import { add, create, trash, checkmarkCircle, time, checkmark, play, close, sunny, moon } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { ThemeService } from '../services/theme.service';
import { Router } from '@angular/router';
import { TaskService } from '../services/task.service';
import { Task, TaskStatus } from '../models/task.model';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    IonIcon,
    IonFab,
    IonFabButton,
    IonRefresher,
    IonRefresherContent,
    IonBadge,
    IonButtons,
    IonSpinner,
    IonSearchbar,
    IonSelect,
    IonSelectOption
  ],
})
export class TasksPage implements OnInit, OnDestroy {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  selectedStatus: TaskStatus | 'all' = 'all';
  searchQuery: string = '';
  sortBy: 'title_asc' | 'title_desc' | 'date_asc' | 'date_desc' | 'updated_asc' | 'updated_desc' = 'date_desc';
  filterBy: 'all' | 'favorites' | 'overdue' | 'pending' | 'in_progress' | 'completed' = 'all';
  isLoading = false;
  isDarkMode = false;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private actionSheetController: ActionSheetController,
    private themeService: ThemeService,
    private cdr: ChangeDetectorRef
  ) {
    addIcons({ add, create, trash, checkmarkCircle, time, checkmark, play, close, sunny, moon });
  }

  ngOnInit() {
    this.loadTasks();
    this.checkDarkMode();
  }

  ngOnDestroy() {
    // Cleanup if needed
  }

  async checkDarkMode() {
    this.isDarkMode = await this.themeService.isDarkMode();
  }

  async toggleDarkMode() {
    console.log('Toggle dark mode clicked');
    await this.themeService.toggle();
    this.isDarkMode = await this.themeService.isDarkMode();
    this.cdr.detectChanges(); // Força detecção de mudanças
    console.log('Dark mode is now:', this.isDarkMode);
  }

  ionViewWillEnter() {
    this.loadTasks();
    this.checkDarkMode();
  }

  async loadTasks() {
    this.isLoading = true;
    try {
      if (this.selectedStatus === 'all') {
        this.tasks = await firstValueFrom(this.taskService.getAllTasks()) || [];
      } else {
        this.tasks = await firstValueFrom(this.taskService.getAllTasks(this.selectedStatus)) || [];
      }
      this.applyFilters();
    } catch (error: any) {
      this.showToast('Erro ao carregar tarefas: ' + error.message, 'danger');
    } finally {
      this.isLoading = false;
    }
  }

  applyFilters() {
    let filtered = [...this.tasks];

    // Aplicar busca
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase().trim();
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(query) ||
        (task.description && task.description.toLowerCase().includes(query))
      );
    }

    // Aplicar filtro selecionado
    switch (this.filterBy) {
      case 'favorites':
        filtered = filtered.filter(task => task.isFavorite);
        break;
      case 'overdue':
        filtered = filtered.filter(task => this.isOverdue(task));
        break;
      case 'pending':
        filtered = filtered.filter(task => task.status === 'pending');
        break;
      case 'in_progress':
        filtered = filtered.filter(task => task.status === 'in_progress');
        break;
      case 'completed':
        filtered = filtered.filter(task => task.status === 'completed');
        break;
      case 'all':
      default:
        // Não filtra por status específico
        break;
    }

    // Aplicar ordenação
    filtered = this.sortTasks(filtered);

    this.filteredTasks = filtered;
  }

  onFilterChange(event: any) {
    this.filterBy = event.detail.value;
    this.applyFilters();
  }

  sortTasks(tasks: Task[]): Task[] {
    const sorted = [...tasks];
    
    switch (this.sortBy) {
      case 'title_asc':
        return sorted.sort((a, b) => a.title.localeCompare(b.title, 'pt-BR'));
      case 'title_desc':
        return sorted.sort((a, b) => b.title.localeCompare(a.title, 'pt-BR'));
      case 'date_asc':
        return sorted.sort((a, b) => 
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      case 'date_desc':
        return sorted.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case 'updated_asc':
        return sorted.sort((a, b) => {
          const dateA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
          const dateB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
          return dateA - dateB;
        });
      case 'updated_desc':
        return sorted.sort((a, b) => {
          const dateA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
          const dateB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
          return dateB - dateA;
        });
      default:
        return sorted;
    }
  }

  onSortChange(event: any) {
    this.sortBy = event.detail.value;
    this.applyFilters();
  }

  onSearchChange(event: any) {
    this.searchQuery = event.detail.value || '';
    this.applyFilters();
  }

  async refreshTasks(event: any) {
    await this.loadTasks();
    event.target.complete();
  }


  clearSearch() {
    this.searchQuery = '';
    this.applyFilters();
  }

  getStatusColor(status: TaskStatus): string {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'in_progress':
        return 'primary';
      case 'completed':
        return 'success';
      default:
        return 'medium';
    }
  }

  getStatusLabel(status: TaskStatus): string {
    switch (status) {
      case 'pending':
        return 'Pendente';
      case 'in_progress':
        return 'Em Andamento';
      case 'completed':
        return 'Concluída';
      default:
        return status;
    }
  }

  navigateToCreate() {
    this.router.navigate(['/task-form']);
  }

  navigateToEdit(task: Task) {
    this.router.navigate(['/task-form', task.id]);
  }

  async deleteTask(task: Task) {
    const alert = await this.alertController.create({
      header: 'Confirmar Exclusão',
      message: `Deseja realmente excluir a tarefa "${task.title}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Excluir',
          role: 'destructive',
          handler: async () => {
            const loading = await this.loadingController.create({
              message: 'Excluindo tarefa...'
            });
            await loading.present();

            try {
              await firstValueFrom(this.taskService.deleteTask(task.id));
              this.showToast('Tarefa excluída com sucesso!', 'success');
              this.loadTasks();
            } catch (error: any) {
              this.showToast('Erro ao excluir tarefa: ' + error.message, 'danger');
            } finally {
              await loading.dismiss();
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async toggleStatus(task: Task) {
    let newStatus: TaskStatus;
    
    if (task.status === 'pending') {
      newStatus = 'in_progress';
    } else if (task.status === 'in_progress') {
      newStatus = 'completed';
    } else {
      return; // Não altera se já estiver concluída
    }

    const loading = await this.loadingController.create({
      message: 'Atualizando status...'
    });
    await loading.present();

    try {
      await firstValueFrom(this.taskService.updateTask(task.id, { status: newStatus }));
      this.showToast('Status atualizado!', 'success');
      this.loadTasks();
    } catch (error: any) {
      this.showToast('Erro ao atualizar status: ' + error.message, 'danger');
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

  formatDate(dateString: string | null): string {
    if (!dateString) return '';
    // A API retorna no fuso horário do Brasil (sem Z), então interpretamos como horário local do Brasil
    const date = new Date(dateString + '-03:00'); // Adiciona UTC-3 (horário de Brasília)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'America/Sao_Paulo'
    });
  }

  isOverdue(task: Task): boolean {
    if (!task.dueDate || task.status === 'completed') return false;
    const dueDate = new Date(task.dueDate);
    const now = new Date();
    return dueDate < now;
  }

  async changeStatus(task: Task, event: Event) {
    event.stopPropagation(); // Previne a navegação para edição

    const actionSheet = await this.actionSheetController.create({
      header: 'Alterar Status',
      subHeader: `Tarefa: ${task.title}`,
      buttons: [
        {
          text: 'Pendente',
          icon: 'time',
          handler: () => {
            this.updateTaskStatus(task, 'pending');
          },
          cssClass: task.status === 'pending' ? 'selected-status' : ''
        },
        {
          text: 'Em Andamento',
          icon: 'play',
          handler: () => {
            this.updateTaskStatus(task, 'in_progress');
          },
          cssClass: task.status === 'in_progress' ? 'selected-status' : ''
        },
        {
          text: 'Concluída',
          icon: 'checkmark-circle',
          handler: () => {
            this.updateTaskStatus(task, 'completed');
          },
          cssClass: task.status === 'completed' ? 'selected-status' : ''
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });

    await actionSheet.present();
  }

  async updateTaskStatus(task: Task, newStatus: TaskStatus) {
    if (task.status === newStatus) {
      return; // Já está com esse status
    }

    const loading = await this.loadingController.create({
      message: 'Atualizando status...'
    });
    await loading.present();

    try {
      await firstValueFrom(this.taskService.updateTask(task.id, { status: newStatus }));
      this.showToast(`Status alterado para: ${this.getStatusLabel(newStatus)}`, 'success');
      this.loadTasks();
    } catch (error: any) {
      this.showToast('Erro ao atualizar status: ' + error.message, 'danger');
    } finally {
      await loading.dismiss();
    }
  }
}
