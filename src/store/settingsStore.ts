import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import { StoreSetting } from '@/types';

interface SettingsState {
  settings: Record<string, string>;
  isLoading: boolean;
  fetchSettings: () => Promise<void>;
  getSetting: (key: string, defaultValue?: string) => string;
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  settings: {},
  isLoading: false,
  fetchSettings: async () => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase
        .from('store_settings')
        .select('key, value');

      if (error) throw error;

      if (data) {
        const settingsMap: Record<string, string> = {};
        data.forEach((s: { key: string; value: string | null }) => {
          if (s.value) settingsMap[s.key] = s.value;
        });
        set({ settings: settingsMap });
      }
    } catch (err) {
      console.error('Error fetching settings:', err);
    } finally {
      set({ isLoading: false });
    }
  },
  getSetting: (key: string, defaultValue: string = '') => {
    return get().settings[key] || defaultValue;
  },
}));
