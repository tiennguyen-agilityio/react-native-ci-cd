import {create} from 'zustand';

// Types
import {Product} from '@/interfaces';

type States = {
  products: Product[] | null;
};

type Actions = {
  setProducts: (products: Product[]) => void;
};

const INITIAL_STATE: States = {
  products: null,
};

export const productsStore = create<States & Actions>(set => ({
  ...INITIAL_STATE,
  setProducts: (products: Product[]) => {
    set({products});
  },
}));
