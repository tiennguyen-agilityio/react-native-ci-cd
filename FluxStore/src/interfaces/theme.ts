export enum THEMES {
  DARK = 'dark',
  LIGHT = 'light',
}

export interface Theme {
  transparent: string;
  primary: string;
  secondary: string;
  tertiary: string;
  error: string;
  success: string;
  link: string;
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
    input: string;
  };
  border: {
    default: string;
    primary: string;
    secondary: string;
    tertiary: string;
  };
}
