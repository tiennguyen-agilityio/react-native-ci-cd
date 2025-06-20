import {memo} from 'react';
import {TouchableOpacity} from 'react-native';
import Svg, {Path} from 'react-native-svg';

import {IconProps} from '@/interfaces';
import {useThemeStore} from '@/stores';

export const SunIcon = memo(
  ({
    width = 20,
    height = 21,
    color,
    isActive = false,
    disabled = false,
    style,
    onPress,
  }: IconProps) => {
    const {
      theme: {icon},
    } = useThemeStore();

    return (
      <TouchableOpacity
        testID="sun-icon"
        activeOpacity={0.8}
        onPress={onPress}
        disabled={disabled}
        style={style}>
        <Svg width={width} height={height} viewBox="0 0 20 21" fill="none">
          <Path
            d="M4.544 3.295l-.341-.358a.841.841 0 00-1.226 0l-.008.01a.932.932 0 000 1.283l.341.357a.834.834 0 001.225 0l.009-.009a.932.932 0 000-1.283zm-2.66 5.83H.99c-.481 0-.866.403-.866.908v.009c0 .504.385.907.866.907h.884c.49.01.875-.394.875-.898v-.01c0-.513-.385-.916-.866-.916zM9.759.005H9.75c-.49 0-.875.402-.875.907v.88c0 .504.385.907.866.907h.009c.49.01.875-.394.875-.898V.91c0-.504-.385-.907-.866-.907zm6.772 2.942a.851.851 0 00-1.233-.01l-.342.358a.932.932 0 000 1.283l.009.01a.834.834 0 001.225 0l.341-.358a.932.932 0 000-1.283zm-1.583 13.841l.34.358a.844.844 0 001.235 0 .944.944 0 000-1.293l-.342-.357a.841.841 0 00-1.225 0 .935.935 0 00-.008 1.292zm1.802-6.755v.009c0 .504.385.907.866.907h.884c.481 0 .866-.403.866-.907v-.01c0-.504-.385-.907-.866-.907h-.884c-.481 0-.866.403-.866.908zm-7-5.491c-2.896 0-5.25 2.465-5.25 5.5 0 3.034 2.354 5.5 5.25 5.5s5.25-2.466 5.25-5.5c0-3.035-2.354-5.5-5.25-5.5zm-.009 15.537h.009c.481 0 .866-.403.866-.907v-.88c0-.505-.385-.908-.866-.908h-.009c-.481 0-.866.404-.866.908v.88c0 .504.385.907.866.907zM2.97 17.137a.844.844 0 001.233 0l.342-.358a.941.941 0 000-1.283l-.009-.01a.844.844 0 00-1.234 0l-.341.358a.953.953 0 00.009 1.293z"
            fill={color || isActive ? icon.default : icon.primary}
          />
        </Svg>
      </TouchableOpacity>
    );
  },
);
