import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'tasks',
    loadComponent: () => import('./tasks/tasks.page').then( m => m.TasksPage)
  },
  {
    path: 'task-form/:id',
    loadComponent: () => import('./task-form/task-form.page').then( m => m.TaskFormPage)
  },
  {
    path: 'task-form',
    loadComponent: () => import('./task-form/task-form.page').then( m => m.TaskFormPage)
  },
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
  },
];
