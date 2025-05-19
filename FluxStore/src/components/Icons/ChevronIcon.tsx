import {memo, useMemo} from 'react';
import {TouchableOpacity} from 'react-native';
import Svg, {Path} from 'react-native-svg';

import {useThemeStore} from '@/hooks';
import {DIRECTION, IconProps} from '@/interfaces';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';

interface ChevronIconProps extends IconProps {
  direction?: DIRECTION;
  rotate?: number;
  duration?: number;
}

export const ChevronIcon = memo(
  ({
    width = 14,
    height = 9,
    color,
    direction = DIRECTION.RIGHT,
    rotate,
    duration = 300,
    disabled = false,
    style,
    onPress,
  }: ChevronIconProps) => {
    const {
      theme: {text},
    } = useThemeStore();

    const rotateValue = useMemo((): number => {
      switch (direction) {
        case DIRECTION.DOWN:
          return 0;

        case DIRECTION.LEFT:
          return 90;

        case DIRECTION.UP:
          return 180;

        case DIRECTION.RIGHT:
          return 270;

        default:
          return 0;
      }
    }, [direction]);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [
        {
          rotate: withTiming(`${rotate ?? rotateValue}deg`, {duration}),
        },
      ],
    }));

    return (
      <TouchableOpacity
        testID="chevron-icon"
        activeOpacity={0.8}
        onPress={onPress}
        disabled={disabled}
        style={style}>
        <Animated.View style={[animatedStyle, {width, height}]}>
          <Svg width={width} height={height} viewBox="0 0 14 9" fill="none">
            <Path d="M13 1L7 7 1 1" stroke={color || text.primary} strokeWidth={2} />
          </Svg>
        </Animated.View>
      </TouchableOpacity>
    );
  },
);
