import {memo} from 'react';
import {TouchableOpacity} from 'react-native';
import Svg, {Ellipse, Path} from 'react-native-svg';

import {IconProps} from '@/interfaces';
import {useThemeStore} from '@/stores';

export const FilterIcon = memo(
  ({width = 27, height = 27, color, disabled = false, style, onPress}: IconProps) => {
    const {
      theme: {text},
    } = useThemeStore();

    return (
      <TouchableOpacity
        testID="filter-icon"
        activeOpacity={0.8}
        onPress={onPress}
        disabled={disabled}
        style={style}>
        <Svg width={width} height={height} viewBox="0 0 27 27" fill="none">
          <Path
            d="M12.375 9H22.5M4.5 18h11.25"
            stroke={color ?? text.tertiary}
            strokeWidth={2}
            strokeLinecap="round"
          />
          <Ellipse
            cx={7.875}
            cy={9}
            rx={3.375}
            ry={3.375}
            transform="rotate(90 7.875 9)"
            stroke={color ?? text.tertiary}
            strokeWidth={2}
            strokeLinecap="round"
          />
          <Ellipse
            cx={19.125}
            cy={18}
            rx={3.375}
            ry={3.375}
            transform="rotate(90 19.125 18)"
            stroke={color ?? text.tertiary}
            strokeWidth={2}
            strokeLinecap="round"
          />
        </Svg>
      </TouchableOpacity>
    );
  },
);
