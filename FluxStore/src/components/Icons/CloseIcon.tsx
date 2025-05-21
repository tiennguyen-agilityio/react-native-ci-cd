import {memo} from 'react';
import {TouchableOpacity} from 'react-native';
import Svg, {Path} from 'react-native-svg';

import {useThemeStore} from '@/hooks';
import {IconProps} from '@/interfaces';

export const CloseIcon = memo(
  ({width = 21, height = 21, color, disabled = false, style, onPress}: IconProps) => {
    const {
      theme: {text},
    } = useThemeStore();

    return (
      <TouchableOpacity
        testID="close-icon"
        activeOpacity={0.8}
        onPress={onPress}
        disabled={disabled}
        style={style}>
        <Svg width={width} height={height} viewBox="0 0 21 21" fill="none">
          <Path
            d="M15.75 5.25l-10.5 10.5M5.25 5.25l10.5 10.5"
            stroke={color ?? text.tertiary}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </TouchableOpacity>
    );
  },
);
