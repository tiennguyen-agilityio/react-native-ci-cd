import {NativeStackScreenProps} from '@react-navigation/native-stack';

export enum SCREENS {
  MAIN_TAB = 'MainTab',
  PROFILES_STACK = 'ProfilesStack',
  SIGN_UP = 'SignUp',
  HOME = 'Home',
  SEARCH = 'Search',
  CART = 'Cart',
  PROFILE = 'Profile',
  WELCOME = 'Welcome',
  INTRO = 'Intro',
  PRODUCTS = 'Products',
  PRODUCT_DETAIL = 'ProductDetail',
}

export type AppStackParamList = {
  [SCREENS.HOME]?: undefined;
  [SCREENS.SEARCH]?: undefined;
  [SCREENS.CART]?: undefined;
  [SCREENS.MAIN_TAB]?: {
    screen: SCREENS;
    params?: object;
  };
  [SCREENS.PROFILES_STACK]?: undefined;
  [SCREENS.PROFILE]?: undefined;
  [SCREENS.WELCOME]?: undefined;
  [SCREENS.INTRO]?: undefined;
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
