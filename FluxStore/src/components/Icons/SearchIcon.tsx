import {memo} from 'react';
import {TouchableOpacity} from 'react-native';
import Svg, {Path} from 'react-native-svg';

import {IconProps} from '@/interfaces';
import {useThemeStore} from '@/stores';

export const SearchIcon = memo(
  ({
    width = 18,
    height = 18,
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
        testID="search-icon"
        activeOpacity={0.8}
        onPress={onPress}
        disabled={disabled}
        style={style}>
        <Svg width={width} height={height} viewBox="0 0 18 18" fill="none">
          <Path
            d="M16.905 16.195l-3.085-3.088c2.41-3.11 2.156-7.538-.613-10.329A7.659 7.659 0 007.734.5c-2.071 0-4.015.81-5.473 2.279A7.779 7.779 0 000 8.293c0 2.087.803 4.046 2.261 5.515a7.659 7.659 0 005.473 2.279 7.604 7.604 0 004.755-1.662l3.064 3.132c.19.19.423.277.676.277.254 0 .486-.107.676-.277.38-.362.38-.98 0-1.363zm-3.338-7.901a5.852 5.852 0 01-1.712 4.153 5.8 5.8 0 01-4.121 1.725 5.797 5.797 0 01-4.121-1.725 5.891 5.891 0 01-1.712-4.153c0-1.576.612-3.046 1.712-4.153a5.8 5.8 0 014.121-1.725c1.563 0 3.022.617 4.12 1.725a5.857 5.857 0 011.713 4.153z"
            fill={color ?? isActive ? text.default : icon.secondary}
          />
        </Svg>
      </TouchableOpacity>
    );
  },
);
