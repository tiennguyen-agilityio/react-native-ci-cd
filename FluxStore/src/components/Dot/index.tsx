import {memo, useMemo} from 'react';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import {useThemeStore} from '@/hooks';
import {colors} from '@/themes';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Flex from '../Flex';

interface DotProps {
  color: string;
  hasBorder: boolean;
  size?: number;
  onSelect: () => void;
}

const Dot = ({color, hasBorder, size = 34, onSelect}: DotProps) => {
  const {isDark} = useThemeStore();

  const scale = useSharedValue(1);

  const rStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  const dotStyles = useMemo(() => {
    if (hasBorder) {
      return {
        width: size,
        height: size,
        borderRadius: '50%',
        shadowColor: isDark ? colors.transparent : colors.black[500],
        borderColor: colors.white[500],
        borderWidth: 5,
        backgroundColor: color,
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 4,
      };
    }

    return {
      width: size - 10,
      height: size - 10,
      borderRadius: '50%',
      shadowColor: colors.black[500],
      backgroundColor: color,
      borderColor: isDark ? colors.black[800] : 'none',
      borderWidth: isDark ? 1 : 0,
    };
  }, [color, isDark, hasBorder, size]);

  const handleSelect = () => {
    'worklet';

    scale.value = withSpring(1.1, {}, () => {
      scale.value = withSpring(1);
      runOnJS(onSelect)();
    });
  };

  const press = Gesture.Pan()
    .onBegin(handleSelect)
    ?.onEnd(() => {
      'worklet';
      scale.value = withSpring(1, {duration: 180});
    });

  const composed = Gesture.Simultaneous(press);

  return (
    <Flex width={size} height={size} align="center" justify="center">
      <GestureDetector gesture={composed}>
        <Animated.View testID={`dot-${color}`} style={[dotStyles, rStyle]} />
      </GestureDetector>
    </Flex>
  );
};

export default memo(Dot);
