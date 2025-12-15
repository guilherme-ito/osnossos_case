import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, firstValueFrom } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Task, CreateTaskDto, UpdateTaskDto, TaskStatus } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private readonly apiUrl = `${environment.apiUrl}/tasks`;

  constructor(private http: HttpClient) {}

  /**
   * Busca todas as tarefas
   * @param status Filtro opcional por status
   */
  getAllTasks(status?: TaskStatus): Observable<Task[]> {
    const url = status ? `${this.apiUrl}?status=${status}` : this.apiUrl;
    return this.http.get<Task[]>(url).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Busca uma tarefa por ID
   */
  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Cria uma nova tarefa
   */
  createTask(task: CreateTaskDto): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Atualiza uma tarefa existente
   */
  updateTask(id: number, task: UpdateTaskDto): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, task).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Deleta uma tarefa
   */
  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Tratamento de erros HTTP
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocorreu um erro desconhecido';
    
    if (error.error instanceof ErrorEvent) {
      // Erro do lado do cliente
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      // Erro do lado do servidor
      if (error.error?.error) {
        errorMessage = error.error.error;
      } else if (error.error?.errors) {
        errorMessage = Array.isArray(error.error.errors) 
          ? error.error.errors.join(', ')
          : error.error.errors;
      } else {
        errorMessage = `Erro ${error.status}: ${error.message}`;
      }
    }
    
    console.error('Erro na requisição:', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}

