import {memo} from 'react';
import {TouchableOpacity} from 'react-native';
import Svg, {Path, Rect} from 'react-native-svg';

import {IconProps} from '@/interfaces';
import {useThemeStore} from '@/stores';
import {colors} from '@/themes';

export const CheckBoxIcon = memo(
  ({
    width = 19,
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
        testID="checkbox-icon"
        activeOpacity={0.8}
        onPress={onPress}
        disabled={disabled}
        style={style}>
        <Svg width={width} height={height} viewBox="0 0 19 20" fill="none">
          <Rect
            x={0.592896}
            width={18.2891}
            height={20}
            rx={4}
            fill={color ?? isActive ? colors.green[200] : icon.checkbox}
          />
          <Path
            d="M5.165 9.47L8.014 13l5.381-6"
            stroke={text.light}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </TouchableOpacity>
    );
  },
);
