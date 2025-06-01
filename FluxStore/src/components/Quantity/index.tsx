import {memo, useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {useThemeStore} from '@/stores';
import {fontSizes} from '@/themes';

import Text from '../Text';
import {MinusIcon, AddIcon} from '../Icons';

interface QuantityProps {
  defaultValue?: number;
  max?: number;
  onChangeValue: (value: number) => void;
}

const Quantity = ({defaultValue = 0, max, onChangeValue}: QuantityProps) => {
  const {
    theme: {border},
  } = useThemeStore();

  const [number, setNumber] = useState<number>(defaultValue);

  const handleIncrement = useCallback(() => {
    const result = number + 1;

    setNumber(result);
    onChangeValue(result);
  }, [number, onChangeValue]);

  const handleDecrement = useCallback(() => {
    setNumber(number - 1);
    onChangeValue(number - 1);
  }, [number, onChangeValue]);

  return (
    <View style={[styles.wrapper, {borderColor: border.senary}]}>
      <MinusIcon disabled={number <= 1} onPress={handleDecrement} style={styles.icon} />
      <Text style={[styles.text, {color: border.senary}]} fontSize={fontSizes.tiny}>
        {number}
      </Text>
      <AddIcon
        style={styles.icon}
        disabled={Boolean(max && number === max)}
        onPress={handleIncrement}
      />
    </View>
  );
};

export default memo(Quantity);

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    width: 63,
    height: 22,
    paddingHorizontal: 8,
  },
  icon: {
    height: 13,
    width: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    flex: 0,
  },
});
