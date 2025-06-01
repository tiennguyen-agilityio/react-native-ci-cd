import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Theme} from '@/interfaces';
import {darkThemes, lightThemes} from '@/themes';
import {persist} from 'zustand/middleware';
import {STORAGE_KEYS} from '@/constants';

interface ThemeState {
  isDark: boolean;
  theme: Theme;
  hasHydrated: boolean;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      isDark: false,
      hasHydrated: false,
      theme: lightThemes,
      toggleTheme: async () => {
        const current = get().isDark;
        const newValue = !current;
        set({
          isDark: newValue,
          theme: newValue ? darkThemes : lightThemes,
        });
      },
    }),
    {
      name: STORAGE_KEYS.THEME,
      storage: {
        getItem: async key => {
          const json = await AsyncStorage.getItem(key);

          return json ? JSON.parse(json) : null;
        },
        setItem: async (key, value) => {
          await AsyncStorage.setItem(key, JSON.stringify(value));
        },
        removeItem: async key => {
          await AsyncStorage.removeItem(key);
        },
      },
      // Re-apply theme on rehydrate
      onRehydrateStorage: () => state => {
        console.log('----state', state);
        if (state) {
          state.theme = state.isDark ? darkThemes : lightThemes;
          setTimeout(() => {
            state.hasHydrated = true;
          }, 0);
        }
      },
    },
  ),
);
