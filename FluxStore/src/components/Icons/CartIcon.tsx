import {memo} from 'react';
import {TouchableOpacity} from 'react-native';
import Svg, {Path} from 'react-native-svg';

import {IconProps} from '@/interfaces';
import {useThemeStore} from '@/stores';

export const CartIcon = memo(
  ({
    width = 20,
    height = 20,
    disabled = false,
    isActive = false,
    color,
    style,
    onPress,
    ...props
  }: IconProps) => {
    const {
      theme: {text},
    } = useThemeStore();

    return (
      <TouchableOpacity
        testID="cart-icon"
        activeOpacity={0.8}
        onPress={onPress}
        disabled={disabled}
        style={style}
        {...props}>
        <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
          <Path
            d="M5 5H3.207A3 3 0 00.213 8.2l.6 9A3 3 0 003.807 20h12.386a3 3 0 002.994-2.8l.6-9A3 3 0 0016.793 5H15v2a1 1 0 11-2 0V5H7v2a1 1 0 01-2 0V5z"
            fill={color || isActive ? text.default : text.light}
          />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5 5a5 5 0 0110 0h-2a3 3 0 10-6 0H5z"
            fill={color || isActive ? text.default : text.light}
          />
        </Svg>
      </TouchableOpacity>
    );
  },
);
