import {create} from 'zustand';

type DeepLinkStore = {
  pendingDeepLink: string | null;
  setPendingDeepLink: (url: string | null) => void;
};

export const useDeepLinkStore = create<DeepLinkStore>(set => ({
  pendingDeepLink: null,
  setPendingDeepLink: url => set({pendingDeepLink: url}),
}));
