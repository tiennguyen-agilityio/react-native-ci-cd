import {NativeStackScreenProps} from '@react-navigation/native-stack';

export enum SCREENS {
  MAIN_TAB = 'MainTab',
  PROFILES_STACK = 'ProfilesStack',
  SIGN_UP = 'SignUp',
  HOME = 'Home',
  PROFILE = 'Profile',
  WELCOME = 'Welcome',
  INTRO = 'Intro',
}

export type AppStackParamList = {
  [SCREENS.HOME]?: undefined;
  [SCREENS.MAIN_TAB]?: undefined;
  [SCREENS.PROFILES_STACK]?: undefined;
  [SCREENS.PROFILE]?: undefined;
  [SCREENS.WELCOME]?: undefined;
  [SCREENS.INTRO]?: undefined;
};

export type BottomTabs = {
  [SCREENS.HOME]?: undefined;
  [SCREENS.PROFILE]?: undefined;
};

export interface TabBarIcon {
  focused: boolean;
  color: string;
  size: number;
}

// AppStack
export type AppStackScreenProps<Screen extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  Screen
>;
