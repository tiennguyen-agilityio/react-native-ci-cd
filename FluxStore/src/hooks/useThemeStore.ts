import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {THEMES, Theme} from '@/interfaces';
import {darkThemes, lightThemes} from '@/themes';

const THEME_KEY = 'APP_THEME';

interface ThemeState {
  isDark: boolean;
  theme: Theme;
  initializeTheme: () => Promise<void>;
  toggleTheme: () => Promise<void>;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  isDark: false,
  theme: lightThemes,
  initializeTheme: async () => {
    try {
      const storedTheme = await AsyncStorage.getItem(THEME_KEY);
      const isDark = storedTheme === THEMES.DARK;

      set({isDark});
      set({theme: isDark ? darkThemes : lightThemes});
    } catch (error) {
      console.error('Failed to load theme:', error);
    }
  },
  toggleTheme: async () => {
    const current = get().isDark;
    const newValue = !current;

    try {
      await AsyncStorage.setItem(THEME_KEY, newValue ? THEMES.DARK : THEMES.LIGHT);

      set({isDark: newValue});
      set({theme: newValue ? darkThemes : lightThemes});
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
  },
}));
