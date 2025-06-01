import {createWithEqualityFn} from 'zustand/traditional';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {shallow} from 'zustand/shallow';

// Constants
import {STORAGE_KEYS} from '@/constants';

type States = {
  isFirstLoad: boolean;
  bootHydrated: boolean;
};

type Actions = {
  finishBoot: () => void;
  setBootHydrated: (hydrated: boolean) => void;
};

const INITIAL_STATE: States = {
  isFirstLoad: true,
  bootHydrated: false,
};

export const useBootstrapsStore = createWithEqualityFn(
  persist<States & Actions>(
    set => ({
      ...INITIAL_STATE,
      finishBoot: () => set({isFirstLoad: false}),
      setBootHydrated: hydrated => set({bootHydrated: hydrated}),
    }),
    {
      name: STORAGE_KEYS.FIRST_LOAD,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({
        ...state,
        isFirstLoad: state.isFirstLoad,
      }),
      onRehydrateStorage: () => state => {
        state?.setBootHydrated(true);
      },
    },
  ),
  shallow,
);
