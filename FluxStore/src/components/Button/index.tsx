import {memo, ReactNode, useMemo} from 'react';
import {
  TouchableOpacity,
  Text,
  PressableProps,
  ColorValue,
  DimensionValue,
  ViewStyle,
  StyleSheet,
  TextStyle,
} from 'react-native';

// Hooks
import {useThemeStore} from '@/hooks';

// Themes
import {colors, fontSizes, fontWeights, fontFamilies} from '@/themes';

export const buttonSize = StyleSheet.create({
  sm: {
    height: 48,
  },

  md: {
    height: 51,
  },

  lg: {
    height: 53,
  },
});

export const buttonTextSize = StyleSheet.create({
  sm: {
    fontSize: fontSizes.sm,
  },

  md: {
    fontSize: fontSizes.sm,
  },

  lg: {
    fontSize: fontSizes.base,
  },
});

export const buttonVariants = StyleSheet.create({
  solid: {
    backgroundColor: colors.black[500],
  },

  outlined: {
    backgroundColor: colors.gray[500],
    borderWidth: 1,
    borderColor: colors.white[500],
  },

  ghost: {
    backgroundColor: colors.transparent,
  },
});

export const buttonTextVariants = StyleSheet.create({
  solid: {
    color: colors.white[500],
  },

  outlined: {
    color: colors.white[500],
  },

  ghost: {
    color: colors.green[200],
    fontWeight: fontWeights.regular,
  },
});

export const buttonBasicStyles: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'center',
  alignContent: 'center',
  alignItems: 'center',
  gap: 15,
  borderRadius: 25,
};

export const buttonTextBasicStyles: TextStyle = {
  textAlign: 'center',
  borderRadius: 25,
  fontFamily: fontFamilies.productSans.bold,
  fontWeight: fontWeights.bold,
};

export interface ButtonProps extends PressableProps {
  text: string;
  disabled?: boolean;
  variant?: 'solid' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  color?: ColorValue;
  width?: DimensionValue;
  height?: DimensionValue;
  fontSize?: number;
  startIcon?: ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
}

const Button = ({
  text,
  variant = 'solid',
  size = 'md',
  width = variant === 'ghost' ? 'auto' : '100%',
  height,
  disabled,
  color,
  fontSize,
  startIcon,
  style,
  onPress,
}: ButtonProps) => {
  const {theme, isDark} = useThemeStore();

  const bgButton = useMemo(() => {
    return variant === 'solid' && isDark
      ? {
          backgroundColor: theme?.primary,
        }
      : null;
  }, [variant, theme, isDark]);

  const textColor = useMemo(() => {
    return variant === 'solid' && isDark
      ? {
          color: theme?.text?.light,
        }
      : null;
  }, [variant, theme, isDark]);

  return (
    <TouchableOpacity
      style={[
        buttonBasicStyles,
        buttonVariants[variant],
        buttonSize[size],
        {
          ...(width && {width}),
          ...(height && {height}),
          ...(bgButton && bgButton),
        },
        style,
      ]}
      activeOpacity={0.8}
      disabled={disabled}
      onPress={onPress}
      testID="button">
      {startIcon && startIcon}
      <Text
        style={[
          buttonTextBasicStyles,
          buttonTextVariants[variant],
          buttonTextSize[size],
          {
            ...(textColor && textColor),
            ...(color && {color}),
            ...(fontSize && {fontSize}),
          },
        ]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default memo(Button);
