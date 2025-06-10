import {useCallback, useMemo} from 'react';
import {FlatList, Platform, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {shallow} from 'zustand/shallow';

// Interfaces
import {Cart, CartScreenProps, SCREENS} from '@/interfaces';

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
  carts: {
    paddingHorizontal: metrics.dimensions.xxl,
    paddingTop: metrics.dimensions.xl,
    paddingBottom: metrics.dimensions.lg,
    gap: metrics.dimensions.lg,
    flexGrow: 1,
  },
});

const isAndroid = Platform.OS === 'android';

const CartScreen = ({navigation}: CartScreenProps<typeof SCREENS.CART>) => {
  useScreenTrace(SCREENS.CART);
  const insets = useSafeAreaInsets();

  const [carts, totalPrice, updateCartItem] = useCartStore(
    state => [state.carts, state.totalPrice, state.updateCartItem],
    shallow,
  );

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

  const width = useMemo(() => metrics.screenWidth - metrics.dimensions.xxl * 2, []);

  const handleGoToCheckout = useCallback(() => {
    navigation.navigate(SCREENS.ORDER_STACK, {
      screen: SCREENS.SHIPPING_ADDRESS,
    });
  }, [navigation]);

  const getKeyExtractor = useCallback(({id}: Cart) => id, []);

  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: width,
      offset: width * index,
      index,
    }),
    [width],
  );

  const renderListEmptyComponent = useCallback(() => <Text>Your Cart Is Empty</Text>, []);

  const renderCartItem = useCallback(
    ({item}: {item: Cart}) => {
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
    },
    [updateCartItem],
  );

  return (
    <MainLayout>
      <Flex flex={1} position="relative" height={metrics.screenHeight}>
        <FlatList
          data={carts}
          extraData={carts}
          showsVerticalScrollIndicator={false}
          keyExtractor={getKeyExtractor}
          renderItem={renderCartItem}
          getItemLayout={getItemLayout}
          ListEmptyComponent={renderListEmptyComponent}
          contentContainerStyle={styles.carts}
        />
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
