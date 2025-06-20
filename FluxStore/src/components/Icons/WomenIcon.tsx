import {memo} from 'react';
import {TouchableOpacity} from 'react-native';
import Svg, {Path} from 'react-native-svg';

import {IconProps} from '@/interfaces';
import {useThemeStore} from '@/stores';

export const WomenIcon = memo(
  ({
    width = 13,
    height = 20,
    color,
    disabled = false,
    isActive = false,
    style,
    onPress,
  }: IconProps) => {
    const {
      theme: {icon, text},
    } = useThemeStore();

    return (
      <TouchableOpacity
        testID="women-icon"
        activeOpacity={0.8}
        onPress={onPress}
        disabled={disabled}
        style={style}>
        <Svg width={width} height={height} viewBox="0 0 13 20" fill="none">
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.25 1.25a5 5 0 100 10 5 5 0 000-10zM0 6.25a6.25 6.25 0 116.875 6.219v2.53h2.5a.625.625 0 010 1.25h-2.5v3.126a.625.625 0 11-1.25 0V16.25h-2.5a.625.625 0 110-1.25h2.5v-2.531A6.25 6.25 0 010 6.249z"
            fill={color ?? isActive ? text.light : icon.tertiary}
          />
        </Svg>
      </TouchableOpacity>
    );
  },
);
