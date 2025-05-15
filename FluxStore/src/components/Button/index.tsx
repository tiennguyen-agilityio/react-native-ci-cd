import {memo, useMemo} from 'react';
import {TouchableOpacity, Text, PressableProps, ColorValue, DimensionValue} from 'react-native';

import {useThemeStore} from '@/hooks';
import {
  buttonSize,
  buttonVariants,
  buttonTextSize,
  buttonTextVariants,
  buttonBasicStyles,
  buttonTextBasicStyles,
} from '@/themes';

export interface ButtonProps extends PressableProps {
  text: string;
  disabled?: boolean;
  onPress?: () => void;
  variant?: 'solid' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  color?: ColorValue;
  width?: DimensionValue;
}

const Button = ({
  text,
  variant = 'solid',
  size = 'md',
  width = '100%',
  disabled,
  onPress,
  color,
}: ButtonProps) => {
  const {theme, isDark} = useThemeStore();

  const bgButton = useMemo(() => {
    return variant === 'solid' && isDark
      ? {
          backgroundColor: theme?.background?.default,
        }
      : null;
  }, [variant, theme, isDark]);

  const textColor = useMemo(() => {
    return variant === 'solid' && isDark
      ? {
          color: theme?.text?.default,
        }
      : null;
  }, [variant, theme, isDark]);

  return (
    <TouchableOpacity
      style={[
        buttonBasicStyles,
        buttonVariants[variant],
        buttonSize[size],
        {width, ...(bgButton && bgButton)},
      ]}
      activeOpacity={0.8}
      disabled={disabled}
      onPress={onPress}
      testID="button">
      <Text
        style={[
          buttonTextBasicStyles,
          buttonTextVariants[variant],
          buttonTextSize[size],
          {
            ...(textColor && textColor),
            ...(color && {color}),
          },
        ]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default memo(Button);
