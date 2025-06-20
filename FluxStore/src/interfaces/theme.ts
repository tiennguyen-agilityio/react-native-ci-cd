import {DimensionValue, ViewStyle} from 'react-native';

export enum THEMES {
  DARK = 'dark',
  LIGHT = 'light',
}

export interface FontsOptional {
  bold?: string;
  medium?: string;
  regular?: string;
}

export interface Dimensions {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}

export interface Metrics {
  screenWidth: number;
  screenHeight: number;
  dimensions: Dimensions;
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
    septenary: string;
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
    senary: string;
    septenary: string;
    input: string;
    radio: string;
    checkbox: string;
    icon: string;
  };
  border: {
    default: string;
    primary: string;
    secondary: string;
    tertiary: string;
    quaternary: string;
    quinary: string;
    senary: string;
    error: string;
  };
  icon: {
    default: string;
    checkbox: string;
    primary: string;
    secondary: string;
    tertiary: string;
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

// Spacing
export interface SpaceProps {
  paddingTop?: DimensionValue;
  paddingBottom?: DimensionValue;
  paddingLeft?: DimensionValue;
  paddingRight?: DimensionValue;
  paddingVertical?: DimensionValue;
  paddingHorizontal?: DimensionValue;
  marginTop?: DimensionValue;
  marginBottom?: DimensionValue;
  marginLeft?: DimensionValue;
  marginRight?: DimensionValue;
  marginVertical?: DimensionValue;
  marginHorizontal?: DimensionValue;
}

// Position
export interface PositionProps {
  position?: 'absolute' | 'relative';
  top?: string | number;
  left?: string | number;
  right?: string | number;
  bottom?: string | number;
  zIndex?: number;
  overflow?: string;
}

// Border
export type BorderRadiusSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export interface BorderProps {
  borderWidth?: DimensionValue;
  borderColor?: string;
  borderRadius?: number;
  borderTopRightRadius?: number;
  borderBottomRightRadius?: number;
}

// BackGround
export interface BackgroundProps {
  backgroundColor?: string;
  opacity?: number;
}

export interface SizesProps {
  width?: DimensionValue;
  minWidth?: DimensionValue;
  maxWidth?: DimensionValue;
  height?: DimensionValue;
  minHeight?: DimensionValue;
  maxHeight?: DimensionValue;
}

export interface CSSProps
  extends SpaceProps,
    BorderProps,
    BackgroundProps,
    PositionProps,
    SizesProps {}

export interface FlexOptions extends CSSProps {
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  justify?: 'center' | 'between' | 'start' | 'end' | 'around' | 'evenly';
  align?: 'start' | 'end' | 'stretch' | 'center' | 'baseline';
  wrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
  flex?: number;
  rowGap?: number;
  columnGap?: number;
  gap?: number;
}

export enum DIRECTION {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right',
}
