export interface Task {
  id: string;
  user_id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  due_date?: string;
  reminder_time?: string;
  created_at: string;
  updated_at: string;
}

export interface Habit {
  id: string;
  user_id: string;
  name: string;
  icon: string;
  color: string;
  target_days: number;
  created_at: string;
}

export interface HabitLog {
  id: string;
  habit_id: string;
  user_id: string;
  completed_date: string;
  created_at: string;
}

export interface UserSettings {
  user_id: string;
  theme: 'light' | 'dark' | 'auto';
  username: string;
  created_at: string;
  updated_at: string;
}
