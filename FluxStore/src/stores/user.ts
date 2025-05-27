// Libs
import {create} from 'zustand';

// Types
import {User} from '@/interfaces';

type States = {
  user: User | null;
};

type Actions = {
  setUser: (user: User) => void;
  removeUser: () => void;
};

const INITIAL_STATE: States = {
  user: null,
};

export const userStore = create<States & Actions>(set => ({
  ...INITIAL_STATE,
  setUser: (user: User) => {
    set({user});
  },
  removeUser: () => {
    set({...INITIAL_STATE});
  },
}));
