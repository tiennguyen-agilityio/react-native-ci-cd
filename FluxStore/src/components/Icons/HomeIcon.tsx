import {memo} from 'react';
import {TouchableOpacity} from 'react-native';
import Svg, {Path} from 'react-native-svg';

import {IconProps} from '@/interfaces';
import {useThemeStore} from '@/hooks';

export const HomeIcon = memo(
  ({
    width = 21,
    height = 22,
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
        testID="home-icon"
        activeOpacity={0.8}
        onPress={onPress}
        disabled={disabled}
        style={style}>
        <Svg width={width} height={height} viewBox="0 0 21 22" fill="none">
          <Path
            d="M21 8.25L13.565.862c-1.143-1.15-4.993-1.15-6.135 0L0 8.25v11.688C0 21.076.916 22 2.047 22h4.526a.88.88 0 00.877-.884v-6.479a.88.88 0 01.877-.883h4.34a.88.88 0 01.877.883v6.48a.88.88 0 00.877.883h4.532C20.084 22 21 21.076 21 19.938V8.25zm-1.755 11.688a.291.291 0 01-.292.294h-3.655v-5.595a2.641 2.641 0 00-2.631-2.65h-4.34a2.641 2.641 0 00-2.631 2.65v5.596H2.04a.294.294 0 01-.293-.295V9.082l6.922-6.97c.463-.447 3.191-.447 3.654 0l6.922 6.97v10.856z"
            fill={color ?? isActive ? text.default : icon.secondary}
          />
        </Svg>
      </TouchableOpacity>
    );
  },
);
