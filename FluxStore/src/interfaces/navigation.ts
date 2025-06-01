import {NativeStackScreenProps} from '@react-navigation/native-stack';

export enum SCREENS {
  AUTH_STACK = 'AuthStack',
  MAIN_TAB = 'MainTab',
  PROFILES_STACK = 'ProfilesStack',
  LOGIN = 'Login',
  HOME = 'Home',
  SEARCH = 'Search',
  CART_STACK = 'CartStack',
  CART = 'Cart',
  SHIPPING_ADDRESS = 'ShippingAddress',
  ORDER_COMPLETED = 'OrderCompleted',
  PROFILE = 'Profile',
  WELCOME = 'Welcome',
  INTRO = 'Intro',
  PRODUCTS = 'Products',
  PRODUCT_DETAIL = 'ProductDetail',
}

export type AppStackParamList = {
  [SCREENS.MAIN_TAB]: {
    screen?: SCREENS;
  };
  [SCREENS.AUTH_STACK]: {
    screen?: SCREENS;
  };
  [SCREENS.WELCOME]: undefined;
  [SCREENS.LOGIN]: undefined;
  [SCREENS.INTRO]: undefined;
  [SCREENS.PRODUCTS]: undefined;
  [SCREENS.PRODUCT_DETAIL]: {id: string};

  [SCREENS.HOME]: undefined;
  [SCREENS.SEARCH]: undefined;
  [SCREENS.PROFILE]: undefined;

  [SCREENS.CART_STACK]: {
    screen?: SCREENS;
  };
  [SCREENS.CART]: undefined;
  [SCREENS.SHIPPING_ADDRESS]: undefined;
  [SCREENS.ORDER_COMPLETED]: undefined;
};

export type BottomTabs = {
  [SCREENS.HOME]?: undefined;
  [SCREENS.SEARCH]?: undefined;
  [SCREENS.CART]?: undefined;
  [SCREENS.PROFILE]?: undefined;
};

export interface TabBarIcon {
  focused: boolean;
  color: string;
  size: number;
}

export type AppStackScreenProps<Screen extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  Screen
>;
