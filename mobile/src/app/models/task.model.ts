export interface Task {
  id: number;
  title: string;
  description: string | null;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string | null;
  completedAt: string | null;
  isFavorite: boolean;
  dueDate: string | null;
}

export type TaskStatus = 'pending' | 'in_progress' | 'completed';

export interface CreateTaskDto {
  title: string;
  description?: string | null;
  status?: TaskStatus;
  isFavorite?: boolean;
  dueDate?: string | null;
}

export interface UpdateTaskDto {
  title?: string;
  description?: string | null;
  status?: TaskStatus;
  isFavorite?: boolean;
  dueDate?: string | null;
}


