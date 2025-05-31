import Svg, {Path} from 'react-native-svg';
import {TouchableOpacity} from 'react-native';
import {memo} from 'react';

import {IconProps} from '@/interfaces';
import {useThemeStore} from '@/stores';

export const MinusIcon = memo(
  ({width = 6, height = 3, disabled = false, color, style, onPress}: IconProps) => {
    const {
      theme: {icon},
    } = useThemeStore();

    return (
      <TouchableOpacity
        testID="minus-icon"
        activeOpacity={0.8}
        onPress={onPress}
        disabled={disabled}
        style={style}>
        <Svg width={width} height={height} viewBox="0 0 6 3" fill="none">
          <Path
            stroke={color || icon.default}
            strokeWidth={1.5}
            d="M0.100098 1.31445L5.89475 1.31445"
          />
        </Svg>
      </TouchableOpacity>
    );
  },
);
