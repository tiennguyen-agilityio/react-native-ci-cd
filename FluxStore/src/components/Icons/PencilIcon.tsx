import {memo} from 'react';
import {TouchableOpacity} from 'react-native';
import Svg, {G, Mask, Path} from 'react-native-svg';

import {IconProps} from '@/interfaces';
import {useThemeStore} from '@/hooks';

export const PencilIcon = memo(
  ({width = 16, height = 16, color, disabled = false, style, onPress}: IconProps) => {
    const {
      theme: {icon, background},
    } = useThemeStore();

    return (
      <TouchableOpacity
        testID="pencil-icon"
        activeOpacity={0.8}
        onPress={onPress}
        disabled={disabled}
        style={style}>
        <Svg width={width} height={height} viewBox="0 0 16 16" fill="none">
          <Mask
            id="a"
            style={{
              maskType: 'luminance',
            }}
            maskUnits="userSpaceOnUse"
            x={1}
            y={1}
            width={14}
            height={14}>
            <Path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13.974 5.103l-3.077-3.077a.615.615 0 00-.87 0L8.614 3.437l3.948 3.948 1.41-1.411c.241-.24.241-.63 0-.87zm-2.282 3.152L7.745 4.308l-5.719 5.718a.615.615 0 00-.18.435v3.077c0 .34.276.616.616.616h3.076c.164 0 .32-.065.436-.18l5.718-5.72z"
              fill={background.default}
            />
          </Mask>
          <G mask="url(#a)">
            <Path fill={color ?? icon.tertiary} d="M0 0H16V16H0z" />
          </G>
        </Svg>
      </TouchableOpacity>
    );
  },
);
