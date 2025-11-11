import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import { Habit, HabitLog } from '@/types/database';

interface HabitStore {
  habits: Habit[];
  habitLogs: HabitLog[];
  loading: boolean;
  fetchHabits: () => Promise<void>;
  fetchHabitLogs: () => Promise<void>;
  addHabit: (name: string, icon?: string, color?: string, targetDays?: number) => Promise<void>;
  deleteHabit: (id: string) => Promise<void>;
  toggleHabitLog: (habitId: string, date: string) => Promise<void>;
  isHabitCompletedOnDate: (habitId: string, date: string) => boolean;
}

export const useHabitStore = create<HabitStore>((set, get) => ({
  habits: [],
  habitLogs: [],
  loading: false,

  fetchHabits: async () => {
    set({ loading: true });
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('habits')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      set({ habits: data || [] });
    } catch (error) {
      console.error('Error fetching habits:', error);
    } finally {
      set({ loading: false });
    }
  },

  fetchHabitLogs: async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('habit_logs')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      set({ habitLogs: data || [] });
    } catch (error) {
      console.error('Error fetching habit logs:', error);
    }
  },

  addHabit: async (name: string, icon = 'check', color = '#3b82f6', targetDays = 7) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('habits')
        .insert({
          user_id: user.id,
          name,
          icon,
          color,
          target_days: targetDays,
        })
        .select()
        .single();

      if (error) throw error;
      if (data) {
        set((state) => ({ habits: [data, ...state.habits] }));
      }
    } catch (error) {
      console.error('Error adding habit:', error);
    }
  },

  deleteHabit: async (id: string) => {
    try {
      const { error } = await supabase.from('habits').delete().eq('id', id);

      if (error) throw error;

      set((state) => ({
        habits: state.habits.filter((h) => h.id !== id),
      }));
    } catch (error) {
      console.error('Error deleting habit:', error);
    }
  },

  toggleHabitLog: async (habitId: string, date: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const existingLog = get().habitLogs.find(
        (log) => log.habit_id === habitId && log.completed_date === date
      );

      if (existingLog) {
        const { error } = await supabase
          .from('habit_logs')
          .delete()
          .eq('id', existingLog.id);

        if (error) throw error;

        set((state) => ({
          habitLogs: state.habitLogs.filter((log) => log.id !== existingLog.id),
        }));
      } else {
        const { data, error } = await supabase
          .from('habit_logs')
          .insert({
            habit_id: habitId,
            user_id: user.id,
            completed_date: date,
          })
          .select()
          .single();

        if (error) throw error;
        if (data) {
          set((state) => ({ habitLogs: [...state.habitLogs, data] }));
        }
      }
    } catch (error) {
      console.error('Error toggling habit log:', error);
    }
  },

  isHabitCompletedOnDate: (habitId: string, date: string) => {
    return get().habitLogs.some(
      (log) => log.habit_id === habitId && log.completed_date === date
    );
  },
}));
