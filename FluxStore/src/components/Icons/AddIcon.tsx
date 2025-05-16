import {useThemeStore} from '@/hooks';
import {IconProps} from '@/interfaces';
import {memo} from 'react';
import {TouchableOpacity} from 'react-native';
import Svg, {Path} from 'react-native-svg';

export const AddIcon = memo(
  ({width = 8, height = 8, color, disabled = false, style, onPress}: IconProps) => {
    const {
      theme: {icon},
    } = useThemeStore();

    return (
      <TouchableOpacity
        testID="add-icon"
        activeOpacity={0.8}
        onPress={onPress}
        disabled={disabled}
        style={style}>
        <Svg width={width} height={height} viewBox="0 0 14 14" fill="none">
          <Path
            d="M13 8H8v5c0 .55-.45 1-1 1s-1-.45-1-1V8H1c-.55 0-1-.45-1-1s.45-1 1-1h5V1c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z"
            fill={color ?? icon.default}
          />
        </Svg>
      </TouchableOpacity>
    );
  },
);
