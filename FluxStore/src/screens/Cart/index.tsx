import {useCallback, useMemo} from 'react';
import {Platform, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

// Interfaces
import {CartScreenProps, SCREENS} from '@/interfaces';

// Constants
import {CURRENCY_UNIT} from '@/constants';

// Hooks
import {useScreenTrace} from '@/hooks';
import {useCartStore, useThemeStore} from '@/stores';

// Themes
import {metrics} from '@/themes';

// Components
import {Button, CartItem, Divider, Flex, MainLayout, Text} from '@/components';

const styles = StyleSheet.create({
  content: {
    paddingTop: 26,
    paddingHorizontal: 23,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    borderTopWidth: 1,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 10,
  },
});

const isAndroid = Platform.OS === 'android';

const CartScreen = ({navigation}: CartScreenProps<typeof SCREENS.CART>) => {
  useScreenTrace(SCREENS.CART);
  const insets = useSafeAreaInsets();

  const {carts, totalPrice, updateCartItem} = useCartStore();

  const {
    theme: {background, text},
  } = useThemeStore();

  const contentStyle = useMemo(
    () => ({
      borderColor: background.default,
      backgroundColor: background.default,
      shadowColor: text.primary,
      paddingBottom: insets.bottom + (isAndroid ? 30 : 0),
    }),
    [background, text, insets],
  );

  const handleGoToCheckout = useCallback(() => {
    navigation.navigate(SCREENS.ORDER_STACK, {
      screen: SCREENS.SHIPPING_ADDRESS,
    });
  }, [navigation]);

  return (
    <MainLayout>
      <Flex flex={1} position="relative" height={metrics.screenHeight}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Flex justify="start" marginTop={24}>
            <Flex flex={1} gap={20} paddingHorizontal={metrics.dimensions.xxl} paddingBottom={20}>
              {carts?.length ? (
                carts?.map(item => {
                  const handleChangeChecked = () => {
                    updateCartItem({...item, isChecked: !item.isChecked});
                  };

                  const handleChangeQuantity = (value: number) => {
                    updateCartItem({...item, quantity: value});
                  };

                  return (
                    <CartItem
                      key={item.id}
                      {...item}
                      onChangeChecked={handleChangeChecked}
                      onChangeQuantity={handleChangeQuantity}
                    />
                  );
                })
              ) : (
                <Text>Your Cart Is Empty</Text>
              )}
            </Flex>
          </Flex>
        </ScrollView>
        <Flex style={[styles.content, contentStyle]}>
          <Flex direction="row" justify="between" paddingVertical={15}>
            <Text>Product price</Text>
            <Text variant="subTitle">{`${CURRENCY_UNIT} ${totalPrice}`}</Text>
          </Flex>
          <Divider />
          <Flex direction="row" justify="between" paddingVertical={15}>
            <Text>Shipping</Text>
            <Text>Freeship</Text>
          </Flex>
          <Divider />
          <Flex direction="row" justify="between" marginBottom={10} paddingVertical={15}>
            <Text>Subtotal</Text>
            <Text variant="title">{`${CURRENCY_UNIT} ${totalPrice}`}</Text>
          </Flex>
          <Flex
            height={insets.bottom}
            width={metrics.screenWidth}
            position="absolute"
            bottom={-insets.bottom}
            backgroundColor={background.default}
          />
          <Button
            size="sm"
            disabled={!(carts?.length && totalPrice)}
            text="Proceed to checkout"
            onPress={handleGoToCheckout}
          />
        </Flex>
      </Flex>
    </MainLayout>
  );
};

export default CartScreen;
