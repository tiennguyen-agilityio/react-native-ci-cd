import {useCallback, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

// Interfaces
import {AppStackScreenProps, SCREENS} from '@/interfaces';

// Constants
import {CARTS} from '@/mocks';
import {CURRENCY_UNIT} from '@/constants';

// Hooks
import {useThemeStore} from '@/hooks';

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

type CartScreenProps = AppStackScreenProps<typeof SCREENS.CART>;

const CartScreen = ({navigation}: CartScreenProps) => {
  const insets = useSafeAreaInsets();

  const {
    theme: {background, text},
  } = useThemeStore();

  const contentStyle = useMemo(
    () => ({
      borderColor: background.default,
      backgroundColor: background.default,
      shadowColor: text.primary,
      paddingBottom: insets.bottom,
    }),
    [background, text, insets],
  );

  const handleGoToCheckout = useCallback(() => {
    navigation.navigate(SCREENS.SHIPPING_ADDRESS);
  }, [navigation]);

  return (
    <MainLayout>
      <Flex flex={1} position="relative" height={metrics.screenHeight}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Flex justify="start" marginTop={24}>
            <Flex flex={1} gap={20} paddingHorizontal={metrics.dimensions.xxl} paddingBottom={20}>
              {CARTS.map(item => {
                const handleChangeChecked = () => {
                  console.log('---handleChangeChecked: ', item.id, !item.isChecked);
                };

                const handleChangeQuantity = (value: number) => {
                  console.log('---handleChangeQuantity: ', item.id, value);
                };

                return (
                  <CartItem
                    key={item.id}
                    {...item}
                    onChangeChecked={handleChangeChecked}
                    onChangeQuantity={handleChangeQuantity}
                  />
                );
              })}
            </Flex>
          </Flex>
        </ScrollView>
        <Flex style={[styles.content, contentStyle]}>
          <Flex direction="row" justify="between" paddingVertical={15}>
            <Text>Product price</Text>
            <Text variant="subTitle">{`${CURRENCY_UNIT} 100.00`}</Text>
          </Flex>
          <Divider />
          <Flex direction="row" justify="between" paddingVertical={15}>
            <Text>Shipping</Text>
            <Text>Freeship</Text>
          </Flex>
          <Divider />
          <Flex direction="row" justify="between" marginBottom={10} paddingVertical={15}>
            <Text>Subtotal</Text>
            <Text variant="title">{`${CURRENCY_UNIT} 100.00`}</Text>
          </Flex>
          <Flex
            height={insets.bottom}
            width={metrics.screenWidth}
            position="absolute"
            bottom={-insets.bottom}
            backgroundColor={background.default}
          />
          <Button size="sm" text="Proceed to checkout" onPress={handleGoToCheckout} />
        </Flex>
      </Flex>
    </MainLayout>
  );
};

export default CartScreen;
