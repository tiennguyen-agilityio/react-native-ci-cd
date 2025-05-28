import type {LinkingOptions} from '@react-navigation/native';

// Interfaces
import {AppStackParamList, SCREENS} from '@/interfaces';

// Constants
import {DEEP_LINK_PATH_PREFIX} from '@/constants';

export const linking: LinkingOptions<AppStackParamList> = {
  prefixes: [DEEP_LINK_PATH_PREFIX],
  config: {
    initialRouteName: SCREENS.MAIN_TAB,
    screens: {
      [SCREENS.MAIN_TAB]: {
        path: '',
        screens: {
          [SCREENS.HOME]: '',
          [SCREENS.SEARCH]: 'search',
          [SCREENS.PROFILE]: 'profile',

          [SCREENS.CART_STACK]: {
            path: 'cart',
            screens: {
              [SCREENS.CART]: '',
              [SCREENS.SHIPPING_ADDRESS]: 'shipping',
              [SCREENS.ORDER_COMPLETED]: 'completed',
            },
          },
        },
      },
      [SCREENS.WELCOME]: 'welcome',
      [SCREENS.INTRO]: 'intro',
      [SCREENS.PRODUCTS]: 'products',
      [SCREENS.PRODUCT_DETAIL]: 'product/:id',
    },
  },
};
