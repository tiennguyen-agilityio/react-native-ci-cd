import {useCallback, useEffect, useMemo} from 'react';
import {View, StyleSheet, LayoutChangeEvent} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';
import {GestureHandlerRootView, GestureDetector, Gesture} from 'react-native-gesture-handler';

// Stores
import {useThemeStore} from '@/stores';

// Components
import {MoonIcon, SunIcon} from '@/components';

const ThemeSwitch = () => {
  const {
    isDark,
    toggleTheme,
    theme: {text, background},
  } = useThemeStore();
  const knobX = useSharedValue(0);
  const optionWidth = useSharedValue(0);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        wrapper: {
          flexDirection: 'row',
          backgroundColor: background.secondary,
          borderRadius: 999,
          padding: 4,
          alignItems: 'center',
          overflow: 'hidden',
        },
        option: {
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 10,
          zIndex: 2,
        },
        icon: {
          fontSize: 18,
          marginRight: 6,
        },
        label: {
          fontSize: 16,
          fontWeight: '600',
        },
        thumb: {
          position: 'absolute',
          width: '50%',
          height: '100%',
          backgroundColor: background.default,
          borderRadius: 999,
          zIndex: 1,
          shadowColor: text.primary,
          shadowOpacity: 0.2,
          shadowOffset: {width: 0, height: 0},
          shadowRadius: 4,
          elevation: 3,
        },
      }),
    [background, text],
  );

  useEffect(() => {
    setTimeout(() => {
      knobX.value = withTiming((isDark ? 1 : 0) * optionWidth.value, {duration: 200});
    }, 50);
  }, [isDark]);

  const onLayout = (e: LayoutChangeEvent) => {
    optionWidth.value = e.nativeEvent.layout.width / 2;
    knobX.value = withTiming((isDark ? 1 : 0) * optionWidth.value);
  };

  const knobStyle = useAnimatedStyle(() => ({
    transform: [{translateX: knobX.value}],
    left: isDark ? 0 : 4,
  }));

  const lightTextStyle = useAnimatedStyle(() => ({
    color: interpolateColor(knobX.value, [0, optionWidth.value], [text.primary, text.secondary]),
  }));

  const darkTextStyle = useAnimatedStyle(() => ({
    color: interpolateColor(knobX.value, [0, optionWidth.value], [text.secondary, text.primary]),
  }));

  const handleTap = useCallback(
    (targetIndex: number) => () => {
      knobX.value = withTiming(targetIndex * optionWidth.value, {duration: 200});
      if ((targetIndex === 1 && !isDark) || (targetIndex === 0 && isDark)) {
        toggleTheme();
      }
    },
    [isDark],
  );

  const tapLight = Gesture.Tap().runOnJS(true).onEnd(handleTap(0));
  const tapDark = Gesture.Tap().runOnJS(true).onEnd(handleTap(1));

  return (
    <GestureHandlerRootView>
      <View style={styles.wrapper} onLayout={onLayout}>
        <Animated.View style={[styles.thumb, knobStyle]} />

        <GestureDetector gesture={tapLight}>
          <Animated.View style={styles.option}>
            <Animated.Text style={[styles.icon, lightTextStyle]}>
              <SunIcon />
            </Animated.Text>
            <Animated.Text style={[styles.label, lightTextStyle]}>Light</Animated.Text>
          </Animated.View>
        </GestureDetector>

        <GestureDetector gesture={tapDark}>
          <Animated.View style={styles.option}>
            <Animated.Text style={[styles.icon, darkTextStyle]}>
              <MoonIcon />
            </Animated.Text>
            <Animated.Text style={[styles.label, darkTextStyle]}>Dark</Animated.Text>
          </Animated.View>
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
};

export default ThemeSwitch;
