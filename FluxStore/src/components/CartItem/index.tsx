import {memo, useMemo} from 'react';
import {Image, StyleSheet} from 'react-native';

import {CURRENCY_UNIT} from '@/constants';
import {borderRadius, fontSizes, colors as TColors} from '@/themes';
import {Cart} from '@/interfaces';
import {useThemeStore} from '@/hooks';

import {CheckBoxIcon} from '../Icons';
import Quantity from '../Quantity';
import Flex from '../Flex';
import Text from '../Text';

interface CartItemProps extends Cart {
  isChecked: boolean;
  onChangeChecked: () => void;
  onChangeQuantity: (quantity: number) => void;
}

const CartItem = ({
  product,
  quantity,
  isChecked,
  sizes,
  colors,
  onChangeChecked,
  onChangeQuantity,
}: CartItemProps) => {
  const {
    theme: {background, fonts},
  } = useThemeStore();
  const {name, image, price} = product;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        wrapper: {
          height: 99,
          flexDirection: 'row',
          borderRadius: borderRadius.lg,
          shadowColor: TColors.gray[500],
          shadowOffset: {width: 0, height: 1},
          shadowOpacity: 0.1,
          shadowRadius: borderRadius.lg,
          elevation: 3,
          backgroundColor: background.default,
        },
        image: {
          width: 99,
          height: '100%',
          borderTopLeftRadius: borderRadius.lg,
          borderBottomLeftRadius: borderRadius.lg,
        },
        info: {
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: '100%',
          paddingTop: 16,
          paddingBottom: 13,
          paddingLeft: 13,
          paddingRight: 20,
          borderTopRightRadius: borderRadius.lg,
          borderBottomRightRadius: borderRadius.lg,
        },
        text: {
          textTransform: 'capitalize',
          fontSize: fontSizes.tiny,
        },
        price: {
          fontFamily: fonts.primary.bold,
        },
      }),
    [fonts, background],
  );

  return (
    <Flex style={styles.wrapper} backgroundColor={background.default}>
      <Image source={{uri: image}} style={styles.image} resizeMode="cover" />
      <Flex style={styles.info}>
        <Flex justify="between">
          <Text variant="title" fontSize={fontSizes.xxs}>
            {name}
          </Text>
          <Text style={styles.price} variant="subTitle">{`${CURRENCY_UNIT} ${price}`}</Text>
          <Text style={styles.text}>{`Size: ${sizes} | Color: ${colors}`}</Text>
        </Flex>
        <Flex justify="between" align="end" marginRight={0}>
          <CheckBoxIcon isActive={isChecked} onPress={onChangeChecked} />
          <Quantity defaultValue={quantity} onChangeValue={onChangeQuantity} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default memo(CartItem);
