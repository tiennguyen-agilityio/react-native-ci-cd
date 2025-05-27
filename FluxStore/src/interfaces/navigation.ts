import {NativeStackScreenProps} from '@react-navigation/native-stack';

export enum SCREENS {
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
  [SCREENS.HOME]?: undefined;
  [SCREENS.SEARCH]?: undefined;
  [SCREENS.MAIN_TAB]?: {
    screen: SCREENS;
    params?: object;
  };
  [SCREENS.CART_STACK]?: {
    screen: SCREENS;
    params?: object;
  };
  [SCREENS.CART]?: undefined;
  [SCREENS.SHIPPING_ADDRESS]?: undefined;
  [SCREENS.ORDER_COMPLETED]?: undefined;
  [SCREENS.PROFILES_STACK]?: undefined;
  [SCREENS.PROFILE]?: undefined;
  [SCREENS.WELCOME]?: undefined;
  [SCREENS.INTRO]?: undefined;
  [SCREENS.LOGIN]?: undefined;
  [SCREENS.PRODUCTS]?: undefined;
  [SCREENS.PRODUCT_DETAIL]: {
    id?: string;
  };
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
