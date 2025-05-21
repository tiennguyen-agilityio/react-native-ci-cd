import {memo} from 'react';
import {TouchableOpacity} from 'react-native';
import Svg, {Path} from 'react-native-svg';

import {IconProps} from '@/interfaces';
import {useThemeStore} from '@/hooks';

export const DeleteIcon = memo(
  ({
    width = 21,
    height = 21,
    color,
    disabled = false,
    isActive = false,
    style,
    onPress,
  }: IconProps) => {
    const {
      theme: {text, icon},
    } = useThemeStore();

    return (
      <TouchableOpacity
        testID="delete-icon"
        activeOpacity={0.8}
        onPress={onPress}
        disabled={disabled}
        style={style}>
        <Svg width={width} height={height} viewBox="0 0 21 21" fill="none">
          <Path
            d="M8.75 13.125V10.5M12.25 13.125V10.5M2.625 6.125h15.75v0c-.581 0-.872 0-1.111.06a2 2 0 00-1.454 1.454c-.06.24-.06.53-.06 1.111v4.75c0 1.886 0 2.828-.586 3.414-.586.586-1.528.586-3.414.586h-2.5c-1.886 0-2.828 0-3.414-.586-.586-.586-.586-1.528-.586-3.414V8.75c0-.581 0-.872-.06-1.111a2 2 0 00-1.454-1.454c-.24-.06-.53-.06-1.111-.06v0zM8.81 2.95c.1-.094.319-.176.625-.235.305-.058.68-.09 1.065-.09.385 0 .76.032 1.065.09.306.059.526.141.625.234"
            stroke={color ?? isActive ? text.default : icon.secondary}
            strokeWidth={2}
            strokeLinecap="round"
          />
        </Svg>
      </TouchableOpacity>
    );
  },
);
