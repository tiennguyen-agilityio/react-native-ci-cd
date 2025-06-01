import {memo, useEffect, useMemo} from 'react';
import {View, ViewStyle, StyleSheet} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  interpolate,
  Easing,
} from 'react-native-reanimated';

import {useThemeStore} from '@/stores';

interface SkeletonProps {
  width: number | string;
  height: number | string;
  borderRadius?: number;
  style?: ViewStyle;
}

const Skeleton = ({width, height, borderRadius = 8, style}: SkeletonProps) => {
  const {
    theme: {background},
  } = useThemeStore();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        wrapper: {
          backgroundColor: background.default,
          overflow: 'hidden',
        },
        overlay: {
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundColor: background.secondary,
        },
      }),
    [background],
  );

  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, {
        duration: 800,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true,
    );
  }, [progress]);

  const shimmerStyle = useAnimatedStyle(() => {
    const opacity = interpolate(progress.value, [0, 0.3, 1], [0.2, 1, 0.2]);
    return {opacity};
  });

  return (
    <View style={[styles.wrapper, {width, height, borderRadius} as ViewStyle, style]}>
      <Animated.View style={[styles.overlay, shimmerStyle]} />
    </View>
  );
};

export default memo(Skeleton);
