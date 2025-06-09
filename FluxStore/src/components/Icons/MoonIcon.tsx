import {memo} from 'react';
import {TouchableOpacity} from 'react-native';
import Svg, {Path} from 'react-native-svg';

import {IconProps} from '@/interfaces';
import {useThemeStore} from '@/stores';

export const MoonIcon = memo(
  ({
    width = 16,
    height = 17,
    color,
    isActive = false,
    disabled = false,
    style,
    onPress,
  }: IconProps) => {
    const {
      theme: {icon},
    } = useThemeStore();

    return (
      <TouchableOpacity
        testID="moon-icon"
        activeOpacity={0.8}
        onPress={onPress}
        disabled={disabled}
        style={style}>
        <Svg width={width} height={height} viewBox="0 0 16 17" fill="none">
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4.644 3.023a6.417 6.417 0 108.915 8.915 10.087 10.087 0 01-8.915-8.915zm10.023 7.142c.793 0 1.477.7 1.163 1.429A8.252 8.252 0 010 8.332 8.252 8.252 0 014.988.752c.729-.314 1.429.37 1.429 1.163a8.25 8.25 0 008.25 8.25z"
            fill={color || isActive ? icon.default : icon.primary}
          />
        </Svg>
      </TouchableOpacity>
    );
  },
);
