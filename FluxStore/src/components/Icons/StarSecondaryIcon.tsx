import {memo} from 'react';
import Svg, {Path} from 'react-native-svg';
import {TouchableOpacity} from 'react-native';

import {IconProps} from '@/interfaces';
import {useThemeStore} from '@/stores';

export const StarSecondaryIcon = memo(
  ({width = 18, height = 18, disabled = false, color, style, onPress}: IconProps) => {
    const {
      theme: {icon},
    } = useThemeStore();
    return (
      <TouchableOpacity
        testID="star-secondary-icon"
        activeOpacity={0.8}
        onPress={onPress}
        disabled={disabled}
        style={style}>
        <Svg width={width} height={height} viewBox="0 0 18 18" fill="none">
          <Path
            d="M7.307 4.22c.643-1.6.964-2.401 1.485-2.512a1 1 0 01.416 0c.522.11.843.911 1.485 2.512.365.91.548 1.365.89 1.675.095.087.199.164.31.23.395.239.887.283 1.873.371 1.67.15 2.504.224 2.758.7.053.099.089.205.106.316.085.533-.528 1.09-1.755 2.207l-.341.31c-.574.522-.86.783-1.026 1.108-.1.195-.166.406-.198.623-.052.361.032.74.2 1.497l.06.27c.301 1.358.452 2.037.264 2.37a1 1 0 01-.823.508c-.383.019-.922-.42-2-1.299-.71-.579-1.065-.868-1.46-.981a2 2 0 00-1.102 0c-.394.113-.75.402-1.46.981-1.078.878-1.617 1.318-2 1.3a1 1 0 01-.823-.509c-.188-.333-.037-1.012.264-2.37l.06-.27c.168-.757.252-1.136.2-1.497a2 2 0 00-.197-.623c-.166-.325-.453-.586-1.027-1.108l-.34-.31C1.899 8.603 1.286 8.045 1.37 7.512a1 1 0 01.106-.316c.255-.476 1.09-.55 2.758-.7.986-.088 1.479-.132 1.874-.37a2 2 0 00.31-.231c.342-.31.524-.765.89-1.675z"
            fill={color || icon.default}
            stroke={color || icon.default}
            strokeWidth={2}
          />
        </Svg>
      </TouchableOpacity>
    );
  },
);
