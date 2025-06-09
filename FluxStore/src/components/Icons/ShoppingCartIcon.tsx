import {memo} from 'react';
import {TouchableOpacity} from 'react-native';
import Svg, {Path} from 'react-native-svg';

import {IconProps} from '@/interfaces';
import {useThemeStore} from '@/stores';

export const ShoppingCartIcon = memo(
  ({
    disabled = false,
    color,
    isActive = false,
    width = 22,
    height = 23,
    style,
    onPress,
    ...props
  }: IconProps) => {
    const {
      theme: {text, icon},
    } = useThemeStore();

    return (
      <TouchableOpacity
        testID="shopping-cart-icon"
        activeOpacity={0.8}
        onPress={onPress}
        disabled={disabled}
        style={style}
        {...props}>
        <Svg width={width} height={height} viewBox="0 0 22 23" fill="none">
          <Path
            d="M6.538 5.208v-.52a4.689 4.689 0 019.375 0v.52h1.68c1.4 0 2.618 1.097 2.76 2.492l1.276 12.514a2.424 2.424 0 01-2.437 2.703H3.26c-1.48 0-2.588-1.227-2.437-2.703L2.098 7.7c.142-1.39 1.362-2.492 2.76-2.492h1.68zm0 2.084h-1.68c-.33 0-.654.292-.687.619L2.895 20.425c-.025.249.12.408.365.408h15.932c.242 0 .39-.163.364-.408L18.281 7.911a.724.724 0 00-.687-.62h-1.68v2.084a1.042 1.042 0 11-2.084 0V7.292H8.622v2.083a1.042 1.042 0 11-2.084 0V7.292zm7.292-2.084v-.961c0-1.194-1.166-2.164-2.604-2.164-1.438 0-2.604.97-2.604 2.164v.961h5.208z"
            fill={color || isActive ? text.default : icon.secondary}
          />
        </Svg>
      </TouchableOpacity>
    );
  },
);
