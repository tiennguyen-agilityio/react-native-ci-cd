import {ViewStyle} from 'react-native';

export enum THEMES {
  DARK = 'dark',
  LIGHT = 'light',
}

export interface FontsOptional {
  bold?: string;
  medium?: string;
  regular?: string;
}

export type Fonts = Required<FontsOptional>;

export interface Theme {
  transparent: string;
  primary: string;
  secondary: string;
  tertiary: string;
  error: string;
  success: string;
  link: string;
  fonts: {
    default: Fonts;
    primary: FontsOptional;
    secondary: FontsOptional;
    tertiary: FontsOptional;
  };
  text: {
    default: string;
    light: string;
    primary: string;
    secondary: string;
    tertiary: string;
    quaternary: string;
    quinary: string;
    senary: string;
    link: string;
    error: string;
    success: string;
  };
  background: {
    default: string;
    primary: string;
    secondary: string;
    tertiary: string;
    quaternary: string;
    quinary: string;
    input: string;
    radio: string;
    checkbox: string;
  };
  border: {
    default: string;
    primary: string;
    secondary: string;
    tertiary: string;
    quaternary: string;
    quinary: string;
    senary: string;
  };
  icon: {
    default: string;
  };
}

export interface IconProps {
  width?: number;
  height?: number;
  color?: string;
  style?: ViewStyle;
  disabled?: boolean;
  isActive?: boolean;
  onPress?: () => void;
}
