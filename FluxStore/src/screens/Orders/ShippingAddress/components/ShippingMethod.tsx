import {memo, useCallback, useMemo, useState} from 'react';
import {StyleSheet, ViewStyle} from 'react-native';

// Stores
import {useThemeStore} from '@/stores';

// Themes
import {fontSizes, fontWeights} from '@/themes';

// Components
import {Flex, Radio, Text} from '@/components';

const styles = StyleSheet.create({
  opacity: {
    opacity: 0.4,
  },
  method: {
    flexDirection: 'row',
    gap: 20,
    paddingVertical: 20,
    paddingHorizontal: 12,
  },
  border: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
});

interface ShippingMethodProps {
  defaultValue?: number;
  onChange: (value: number) => void;
}

const ShippingMethod = ({defaultValue, onChange}: ShippingMethodProps) => {
  const {
    theme: {background, text, border},
  } = useThemeStore();

  const [value, setValue] = useState(defaultValue);

  const styleSelected: ViewStyle = useMemo(
    () => ({
      ...styles.border,
      borderColor: border.quaternary,
      backgroundColor: background.quaternary,
    }),
    [border, background],
  );

  const handleChangeValue = useCallback(
    (fee: number) => {
      setValue(fee);
      onChange(fee);
    },
    [onChange],
  );

  return (
    <Flex>
      <Text variant="subTitle">Shipping method</Text>
      <Flex marginTop={25} style={[styles.method, !value && styleSelected]}>
        <Radio selected={!value} onPress={() => handleChangeValue(0)} />
        <Flex justify="between" gap={7}>
          <Flex direction="row" align="center" gap={15}>
            <Text fontSize={fontSizes.xs} fontWeight={fontWeights.semiBold} color={text.primary}>
              Free
            </Text>
            <Text>Delivery to home</Text>
          </Flex>
          <Text variant="description" color={text.quaternary} style={styles.opacity}>
            Delivery from 3 to 7 business days
          </Text>
        </Flex>
      </Flex>
      <Flex style={[styles.method, value === 9.9 && styleSelected]}>
        <Radio selected={value === 9.9} onPress={() => handleChangeValue(9.9)} />
        <Flex justify="between" gap={7}>
          <Flex direction="row" align="center" gap={15}>
            <Text fontSize={fontSizes.xs} fontWeight={fontWeights.semiBold} color={text.primary}>
              $ 9.90
            </Text>
            <Text>Delivery to home</Text>
          </Flex>
          <Text variant="description" color={text.quaternary} style={styles.opacity}>
            Delivery from 4 to 6 business days
          </Text>
        </Flex>
      </Flex>
      <Flex style={[styles.method, value === 19.9 && styleSelected]}>
        <Radio selected={value === 19.9} onPress={() => handleChangeValue(19.9)} />
        <Flex justify="between" gap={7}>
          <Flex direction="row" align="center" gap={15}>
            <Text fontSize={fontSizes.xs} fontWeight={fontWeights.semiBold} color={text.primary}>
              $ 19.90
            </Text>
            <Text>Fast Delivery</Text>
          </Flex>
          <Text variant="description" color={text.quaternary} style={styles.opacity}>
            Delivery from 2 to 3 business days
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default memo(ShippingMethod);
