import AsyncStorage from '@react-native-async-storage/async-storage';
import {persist, createJSONStorage} from 'zustand/middleware';
import {createWithEqualityFn} from 'zustand/traditional';
import {shallow} from 'zustand/shallow';

// Interfaces
import {User} from '@/interfaces';

// Constants
import {STORAGE_KEYS} from '@/constants';

type States = {
  isAuthenticated?: boolean;
  authHydrated?: boolean;
  user: User | null;
};

type Actions = {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setAuthHydrated: (hydrated: boolean) => void;
  setUser: (user: User) => void;
};

const INITIAL_STATE: States = {
  isAuthenticated: false,
  authHydrated: false,
  user: null,
};

export const useAuthStore = createWithEqualityFn<States & Actions>()(
  persist(
    set => ({
      ...INITIAL_STATE,
      setAuthHydrated: hydrated => set({authHydrated: hydrated}),
      setIsAuthenticated: (isAuthenticated: boolean) => {
        set({isAuthenticated});
      },
      setUser: (user: User) => {
        set({user});
      },
    }),
    {
      name: STORAGE_KEYS.AUTH,
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => state => {
        state?.setAuthHydrated(true);
      },
      partialize: state => {
        return {
          user: state.user,
          isAuthenticated: state.isAuthenticated,
        };
      },
    },
  ),
  shallow,
);
