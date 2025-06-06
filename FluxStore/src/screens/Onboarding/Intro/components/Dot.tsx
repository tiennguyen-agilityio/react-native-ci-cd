import {colors} from '@/themes';
import {memo, useCallback} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import Animated, {
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const styles = StyleSheet.create({
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: colors.white[500],
  },
});

interface DotProps {
  index: number;
  currentIndex: SharedValue<number>;
  onPress: (index: number) => void;
}

const Dot = ({index, currentIndex, onPress}: DotProps) => {
  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      currentIndex.value,
      [index - 1, index, index + 1],
      [colors.transparent, colors.white[500], colors.transparent],
    );

    return {
      backgroundColor,
      transform: [
        {
          scale: withTiming(currentIndex.value === index ? 1.2 : 1),
        },
      ],
    };
  });

  const handlePress = useCallback(() => {
    onPress(index);
  }, [index, onPress]);

  return (
    <Pressable onPress={handlePress}>
      <Animated.View style={[styles.dot, animatedStyle]} />
    </Pressable>
  );
};

export default memo(Dot);
