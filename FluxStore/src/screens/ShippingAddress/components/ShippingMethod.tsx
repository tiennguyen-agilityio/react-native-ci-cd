import {memo} from 'react';
import {StyleSheet} from 'react-native';

// Hooks
import {useThemeStore} from '@/hooks';

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

const ShippingMethod = () => {
  const {
    theme: {background, text, border},
  } = useThemeStore();

  return (
    <Flex>
      <Text variant="subTitle">Shipping method</Text>
      <Flex
        marginTop={25}
        backgroundColor={background.quaternary}
        style={[styles.method, styles.border, {borderColor: border.secondary}]}>
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
      <Flex style={styles.method}>
        <Radio />
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
      <Flex style={styles.method}>
        <Radio />
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
