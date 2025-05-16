import {memo, useMemo} from 'react';
import Svg, {Path} from 'react-native-svg';
import {View, Text, ViewStyle, TouchableOpacity, StyleSheet, TextStyle} from 'react-native';

// Hooks
import {useThemeStore} from '@/hooks';
import {colors, fontFamilies, fontSizes} from '@/themes';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 14,
  },
});

export interface CheckboxProps {
  label?: string;
  size?: number;
  selected?: boolean;
  disabled?: boolean;
  onValueChange: () => void;
}

const Checkbox = ({
  label = '',
  size = 20,
  disabled = false,
  selected = false,
  onValueChange,
}: CheckboxProps) => {
  const {theme} = useThemeStore();

  const checkboxStyles: ViewStyle = useMemo(() => {
    let borderColor = selected ? theme.border.quinary : theme.border.quaternary;
    let backgroundColor = selected ? theme.background.checkbox : theme.transparent;

    if (disabled) {
      borderColor = colors.gray.A500;
      backgroundColor = selected ? colors.gray.A500 : colors.transparent;
    }

    return {
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      width: size,
      height: size,
      borderColor,
      backgroundColor,
    };
  }, [
    size,
    selected,
    disabled,
    theme.transparent,
    theme.border.quinary,
    theme.border.quaternary,
    theme.background.checkbox,
  ]);

  const labelStyles: TextStyle = useMemo(
    () => ({
      fontFamily: fontFamilies.productSans.medium,
      fontSize: fontSizes.xs,
      color: disabled ? colors.gray.A500 : theme.text.default,
    }),
    [theme.text.default, disabled],
  );

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled}
      onPress={onValueChange}
      style={styles.wrapper}>
      <View style={checkboxStyles}>
        {selected && (
          <Svg width={9} height={7} viewBox="0 0 9 7" fill="none">
            <Path
              d="M3.535 7a.995.995 0 01-.711-.3L.292 4.116a1.037 1.037 0 010-1.442.987.987 0 011.413 0l1.802 1.839L7.262.33A.98.98 0 018.675.273c.408.377.437 1.026.057 1.442L4.275 6.671A.974.974 0 013.554 7h-.019z"
              fill={colors.white[500]}
            />
          </Svg>
        )}
      </View>
      {label && <Text style={labelStyles}>{label}</Text>}
    </TouchableOpacity>
  );
};

export default memo(Checkbox);
