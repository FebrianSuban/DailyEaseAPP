import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import { UserSettings } from '@/types/database';
import { useColorScheme } from 'react-native';

interface SettingsStore {
  settings: UserSettings | null;
  loading: boolean;
  fetchSettings: () => Promise<void>;
  updateSettings: (updates: Partial<UserSettings>) => Promise<void>;
  getEffectiveTheme: () => 'light' | 'dark';
}

export const useSettingsStore = create<SettingsStore>((set, get) => ({
  settings: null,
  loading: false,

  fetchSettings: async () => {
    set({ loading: true });
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        const { data: newSettings, error: insertError } = await supabase
          .from('user_settings')
          .insert({
            user_id: user.id,
            username: 'User',
            theme: 'auto',
          })
          .select()
          .single();

        if (insertError) throw insertError;
        set({ settings: newSettings });
      } else {
        set({ settings: data });
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      set({ loading: false });
    }
  },

  updateSettings: async (updates: Partial<UserSettings>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('user_settings')
        .update(updates)
        .eq('user_id', user.id);

      if (error) throw error;

      set((state) => ({
        settings: state.settings ? { ...state.settings, ...updates } : null,
      }));
    } catch (error) {
      console.error('Error updating settings:', error);
    }
  },

  getEffectiveTheme: () => {
    const settings = get().settings;
    if (!settings || settings.theme === 'auto') {
      return useColorScheme() || 'light';
    }
    return settings.theme;
  },
}));
