import {memo, useMemo} from 'react';
import {TouchableOpacity} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';

import {useThemeStore} from '@/stores';
import {DIRECTION, IconProps} from '@/interfaces';

interface ArrowIconProps extends IconProps {
  direction?: DIRECTION;
  rotate?: number;
  duration?: number;
}

export const ArrowIcon = memo(
  ({
    width = 10,
    height = 6,
    color,
    direction = DIRECTION.RIGHT,
    rotate,
    duration = 300,
    disabled = false,
    style,
    onPress,
  }: ArrowIconProps) => {
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
        default:
          return 270;
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
        testID="arrow-icon"
        activeOpacity={0.8}
        onPress={onPress}
        disabled={disabled}
        style={style}>
        <Animated.View style={[animatedStyle, {width, height}]}>
          <Svg width={width} height={height} viewBox="0 0 10 6" fill="none">
            <Path
              d="M4.808 5.77L1.093 1.312A.8.8 0 011.708 0h6.584a.8.8 0 01.615 1.312L5.192 5.77a.25.25 0 01-.384 0z"
              fill={color || text.primary}
            />
          </Svg>
        </Animated.View>
      </TouchableOpacity>
    );
  },
);
