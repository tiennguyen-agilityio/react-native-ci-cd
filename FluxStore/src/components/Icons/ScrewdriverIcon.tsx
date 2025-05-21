import {memo} from 'react';
import {TouchableOpacity} from 'react-native';
import Svg, {Path} from 'react-native-svg';

import {IconProps} from '@/interfaces';
import {useThemeStore} from '@/hooks';

export const ScrewdriverIcon = memo(
  ({
    width = 6,
    height = 22,
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
        testID="screwdriver-icon"
        activeOpacity={0.8}
        onPress={onPress}
        disabled={disabled}
        style={style}>
        <Svg width={width} height={height} viewBox="0 0 6 22" fill="none">
          <Path
            d="M3 13V5M1 13h4v6a2 2 0 11-4 0v-6zM1 1h4L4 5H2L1 1z"
            stroke={color ?? isActive ? text.light : icon.tertiary}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </TouchableOpacity>
    );
  },
);
