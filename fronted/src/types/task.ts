export interface Task {
  id: string;
  title: string;
  description?: string;
  is_completed: boolean;
  user_id: string;
  created_at: string;
  updated_at: string;
  due_date?: string;
}

export interface TaskCreate {
  title: string;
  description?: string;
  due_date?: string;
}

export interface TaskUpdate {
  title?: string;
  description?: string;
  due_date?: string;
}

export interface TaskCompletionUpdate {
  is_completed: boolean;
}