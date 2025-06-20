import {memo} from 'react';
import {TouchableOpacity} from 'react-native';
import Svg, {Path} from 'react-native-svg';

import {useThemeStore} from '@/stores';
import {IconProps} from '@/interfaces';

export const MenuIcon = memo(
  ({width = 20, height = 20, color, disabled = false, style, onPress}: IconProps) => {
    const {
      theme: {icon},
    } = useThemeStore();

    return (
      <TouchableOpacity
        testID="menu-icon"
        activeOpacity={0.8}
        onPress={onPress}
        disabled={disabled}
        style={style}>
        <Svg width={width} height={height} viewBox="0 0 20 20" fill="none">
          <Path
            d="M1 1.5h10M1 9.5h18M1 18.5h18"
            stroke={color ?? icon.primary}
            strokeWidth={2}
            strokeLinecap="round"
          />
        </Svg>
      </TouchableOpacity>
    );
  },
);
