import {create} from 'zustand';
import {SCREENS} from '@/interfaces';
import {parseDeepLink} from '@/configs';

type PendingDeepLink =
  | {
      stack: SCREENS;
      screen: SCREENS;
      params?: undefined;
    }
  | {
      stack: SCREENS;
      screen: SCREENS;
      params: {
        id: string;
      };
    }
  | null;

type DeepLinkStore = {
  pendingDeepLink: PendingDeepLink;
  setPendingDeepLink: (url: string | null) => void;
};

export const useDeepLinkStore = create<DeepLinkStore>(set => ({
  pendingDeepLink: null,
  setPendingDeepLink: (url: string | null) => {
    if (!url) {
      return set({pendingDeepLink: null});
    }
    const value = parseDeepLink(url);

    set({pendingDeepLink: value});
  },
}));
