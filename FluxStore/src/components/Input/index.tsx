import {memo, RefObject, useCallback, useMemo, useState} from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native';
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';

// Hooks
import {useThemeStore} from '@/stores';

// Themes
import {colors, fontSizes, fontWeights} from '@/themes';

// Components
import Text from '../Text';
import Flex from '../Flex';
import Divider from '../Divider';

export interface InputProps extends TextInputProps {
  ref?: RefObject<TextInput | null>;
  field?: string;
  placeholder?: string;
  label?: string;
  errorMessage?: string;
  isRequired?: boolean;
  onSubmit?: () => void;
  onChangeText?: (value: string, field?: string) => void;
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
}

const Input = ({
  ref,
  field = '',
  placeholder = '',
  errorMessage = '',
  editable = true,
  isRequired = false,
  defaultValue,
  onFocus,
  onBlur,
  onChangeText,
  onSubmit,
  ...props
}: InputProps) => {
  const {
    theme: {border, text},
  } = useThemeStore();
  const [value, setValue] = useState(defaultValue);
  const bottom = useSharedValue(defaultValue ? 36 : 15);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        label: {
          position: 'absolute',
          left: 0,
          bottom: 0,
          right: 0,
          top: 0,
          zIndex: 1,
        },
        input: {
          height: 51,
          paddingTop: 25,
          color: text.default,
          paddingBottom: 2,
          paddingLeft: 0,
          textAlignVertical: 'bottom',
          lineHeight: 20,
        },
        text: {
          fontSize: fontSizes.xs,
          color: value ? text.tertiary : text.tertiary,
          fontWeight: value ? fontWeights.medium : fontWeights.regular,
        },
        error: {
          fontSize: fontSizes.tiny,
          color: colors.red[500],
        },
      }),
    [text, value],
  );

  const animatedStyle: ViewStyle = useAnimatedStyle(() => ({
    flexDirection: 'row',
    position: 'absolute',
    left: 0,
    bottom: bottom.value,
    zIndex: 2,
  }));

  const handleFocus = useCallback(
    (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
      if (!value) {
        bottom.value = withTiming(36, {duration: 500});
      }
      onFocus?.(event);
    },
    [bottom, value, onFocus],
  );

  const handleBlur = useCallback(
    (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
      if (!value) {
        bottom.value = withTiming(15, {duration: 500});
      }
      onBlur?.(event);
    },
    [bottom, value, onBlur],
  );

  const handleChangeText = useCallback(
    (str: string) => {
      setValue(str);
      onChangeText?.(str, field);
    },
    [field, onChangeText],
  );

  const handleSubmitEditing = useCallback(() => {
    onSubmit?.();
  }, [onSubmit]);

  return (
    <Flex>
      <Flex position="relative" height={51}>
        <TouchableWithoutFeedback
          onPress={() => {
            ref?.current?.focus();
          }}
          style={styles.label}>
          <Animated.View style={animatedStyle}>
            <Text style={styles.text}>{placeholder}</Text>
            {isRequired && (
              <Text
                style={[
                  styles.text,
                  {
                    color: errorMessage ? text.error : text.tertiary,
                  },
                ]}>
                {` *`}
              </Text>
            )}
          </Animated.View>
        </TouchableWithoutFeedback>
        <TextInput
          testID="input"
          ref={ref}
          style={[styles.input]}
          editable={editable}
          defaultValue={defaultValue}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={handleChangeText}
          onSubmitEditing={handleSubmitEditing}
          {...props}
        />
      </Flex>
      <Divider color={errorMessage ? border.error : border.secondary} />

      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
    </Flex>
  );
};

export default memo(Input);
