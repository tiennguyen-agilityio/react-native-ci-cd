import {create} from 'zustand';
import {SCREENS} from '@/interfaces';
import {PATH_PREFIX} from '@/constants';

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

export const parseDeepLink = (url: string) => {
  const regex = new RegExp(`${PATH_PREFIX}([^/]+)\\/?(\\d+)?`);
  const match = url.match(regex);
  if (!match) return null;

  const screen = match[1];
  const id = match[2];

  switch (screen) {
    case 'products':
      return {
        stack: SCREENS.PRODUCT_STACK,
        screen: SCREENS.PRODUCTS,
      };

    case 'product':
      return {
        stack: SCREENS.PRODUCT_STACK,
        screen: SCREENS.PRODUCT_DETAIL,
        params: {id},
      };
    default:
      return null;
  }
};

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
