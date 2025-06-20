import {memo, ReactNode, useCallback, useState} from 'react';
import {View, TouchableOpacity, StyleSheet, ViewStyle, LayoutChangeEvent} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

// Stores
import {useThemeStore} from '@/stores';

// Components
import Flex from '../Flex';
import Text from '../Text';
import {ChevronIcon} from '../Icons';
import Divider from '../Divider';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 24,
  },
  content: {
    width: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    paddingVertical: 20,
  },
  animatedView: {
    width: '100%',
    overflow: 'hidden',
  },
});

interface CollapseProps {
  label: string;
  isOpen?: boolean;
  duration?: number;
  children: ReactNode;
  contentStyle?: ViewStyle;
}

const Collapse = ({children, label, duration = 300, contentStyle}: CollapseProps) => {
  const {
    theme: {background, text},
  } = useThemeStore();
  const [isOpen, setIsOpen] = useState(false);

  const open = useSharedValue(false);
  const height = useSharedValue(0);

  const derivedHeight = useDerivedValue(() =>
    withTiming(height.value * Number(open.value), {
      duration,
    }),
  );

  const bodyStyle = useAnimatedStyle(() => ({
    height: derivedHeight.value,
  }));

  const handleToggle = useCallback(() => {
    setIsOpen(prev => !prev);
    open.value = !open.value;
  }, [open]);

  const handleLayout = useCallback(
    (event: LayoutChangeEvent) => {
      height.value = event.nativeEvent.layout.height;
    },
    [height],
  );

  return (
    <Flex width="100%">
      <TouchableOpacity testID="label" activeOpacity={0.6} onPress={handleToggle}>
        <Flex direction="row" align="center" justify="between" paddingRight={9} paddingVertical={9}>
          <Text variant="subTitle" color={text.default}>
            {label}
          </Text>
          <ChevronIcon rotate={isOpen ? 0 : -90} duration={duration} />
        </Flex>
      </TouchableOpacity>
      <Divider color={background.quinary} />

      <Animated.View style={[styles.animatedView, bodyStyle]}>
        <View testID="content" onLayout={handleLayout} style={[styles.content, contentStyle]}>
          {children}
        </View>
      </Animated.View>
    </Flex>
  );
};

export default memo(Collapse);
