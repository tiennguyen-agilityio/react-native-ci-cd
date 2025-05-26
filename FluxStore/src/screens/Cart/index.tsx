// Components
import {Flex, MainLayout, Text} from '@/components';
import {metrics} from '@/themes';

const CartScreen = () => {
  return (
    <MainLayout>
      <Flex paddingHorizontal={metrics.dimensions.xxl}>
        <Text variant="heading">Cart Screen</Text>
      </Flex>
    </MainLayout>
  );
};

export default CartScreen;
