import {Flex} from '@/components';
import {colors} from '@/themes';
import {memo, useCallback, useMemo} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import Animated, {SharedValue, useAnimatedStyle, withTiming} from 'react-native-reanimated';

interface DotProps {
  index: number;
  color?: string;
  currentIndex: SharedValue<number>;
  onPress: (index: number) => void;
}

const Dot = ({index, currentIndex, color, onPress}: DotProps) => {
  const animatedStyle = useAnimatedStyle(() => {
    const isCurrentValue = currentIndex.value === index;

    return {
      backgroundColor: colors.transparent,
      borderWidth: withTiming(isCurrentValue ? 1 : 0),
      borderColor: withTiming(isCurrentValue ? color ?? colors.white[500] : colors.transparent),
      transform: [
        {
          scale: withTiming(isCurrentValue ? 1.3 : 1),
        },
      ],
    };
  });

  const styles = useMemo(
    () =>
      StyleSheet.create({
        wrapper: {
          width: 10.5,
          height: 10.5,
          borderRadius: 10.5,
          borderWidth: 3,
          padding: 1.5,
          justifyContent: 'center',
          overflow: 'hidden',
          alignItems: 'center',
          backgroundColor: colors.transparent,
          borderColor: color ?? colors.white[500],
        },
        dot: {
          width: 4.5,
          height: 4.5,
          borderRadius: 4.5,
          overflow: 'hidden',
          backgroundColor: color ?? colors.white[500],
        },
      }),
    [color],
  );

  const handlePress = useCallback(() => {
    onPress(index);
  }, [index, onPress]);

  return (
    <Pressable onPress={handlePress}>
      <Animated.View style={[styles.wrapper, animatedStyle]}>
        <Flex style={styles.dot} />
      </Animated.View>
    </Pressable>
  );
};

export default memo(Dot);
