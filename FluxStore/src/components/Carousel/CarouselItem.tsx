import {memo, ReactNode} from 'react';
import Animated, {interpolate, SharedValue, useAnimatedStyle} from 'react-native-reanimated';

interface CarouselItemProps {
  index: number;
  translateX: SharedValue<number>;
  width: number;
  height: number;
  isScaled?: boolean;
  children: ReactNode;
}

const CarouselItem = ({
  index,
  translateX,
  width,
  height,
  isScaled = false,
  children,
}: CarouselItemProps) => {
  const animatedCardStyle = useAnimatedStyle(() => {
    const offset = translateX.value + index * width;
    const progress = Math.abs(offset) / width;
    const scale = interpolate(progress, [0, 1], [1, 0.75], 'clamp');

    return {
      transform: [{scale}],
    };
  });

  return (
    <Animated.View style={[{width, height}, isScaled && animatedCardStyle]}>
      {children}
    </Animated.View>
  );
};

export default memo(CarouselItem);
