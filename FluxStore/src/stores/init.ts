import {shallow} from 'zustand/shallow';
import {createWithEqualityFn} from 'zustand/traditional';
import {createJSONStorage, persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Constanst
import {STORAGE_KEYS} from '@/constants';

type States = {
  isFirstLogin: boolean;
};

type Actions = {
  setIsFirstLogin: (isFirstLogin: boolean) => void;
};

const INITIAL_STATE: States = {
  isFirstLogin: true,
};

export const useInitStore = createWithEqualityFn(
  persist<States & Actions>(
    set => ({
      ...INITIAL_STATE,

      setIsFirstLogin: (isFirstLogin: boolean) => {
        set({isFirstLogin});
      },
    }),
    {
      name: STORAGE_KEYS.FIRST_LOGIN,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({
        isFirstLogin: state.isFirstLogin,
      }),
    },
  ),
  shallow,
);
