// Libs
import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Constants
import {AUTH_STORE_KEY} from '@/constants';
import {AuthKey} from '@/interfaces';

type States = {
  authKey: AuthKey | null;
  verify_id: string;
};

type Actions = {
  setAuthKey: (authKey: AuthKey) => void;
  removeAuth: () => void;
};

const INITIAL_STATE: States = {
  authKey: null,
  verify_id: '',
};

export const authStore = create(
  persist<States & Actions>(
    set => ({
      ...INITIAL_STATE,
      setAuthKey: (authKey: AuthKey) => {
        set({authKey});
      },
      removeAuth: () => {
        set({...INITIAL_STATE});
      },
    }),
    {
      name: AUTH_STORE_KEY,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
