import {useCallback} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

// Interfaces
import {OrderScreenProps, SCREENS} from '@/interfaces';

// Hooks | Stores
import {useScreenTrace} from '@/hooks';
import {useThemeStore} from '@/stores';

// Themes
import {fontSizes, metrics} from '@/themes';

// Components
import {Button, CartCompletedIcon, Flex, MainLayout, Text} from '@/components';

const OrderCompletedScreen = ({navigation}: OrderScreenProps<typeof SCREENS.ORDER_COMPLETED>) => {
  useScreenTrace(SCREENS.ORDER_COMPLETED);

  const insets = useSafeAreaInsets();

  const {
    theme: {icon},
  } = useThemeStore();

  const handleGoToHome = useCallback(() => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: SCREENS.TABS,
          state: {
            index: 0,
            routes: [{name: SCREENS.HOME}],
          },
        },
      ],
    });
  }, [navigation]);

  return (
    <MainLayout>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Flex flex={1} justify="between" marginTop={24} paddingHorizontal={metrics.dimensions.xxl}>
          <Text variant="heading" fontSize={fontSizes.xl}>
            Order Completed
          </Text>
          <Flex gap={55} marginTop={120} marginHorizontal="auto" align="center" maxWidth={272}>
            <CartCompletedIcon color={icon.primary} />
            <Text textAlign="center" color={icon.primary}>
              {`Thank you for your purchase.You can view your order in \u02bcMy Orders\u02bc section.`}
            </Text>
          </Flex>
          <Flex marginTop={128} marginBottom={insets.bottom}>
            <Button size="sm" text="Continue shopping" onPress={handleGoToHome} />
          </Flex>
        </Flex>
      </ScrollView>
    </MainLayout>
  );
};

export default OrderCompletedScreen;
