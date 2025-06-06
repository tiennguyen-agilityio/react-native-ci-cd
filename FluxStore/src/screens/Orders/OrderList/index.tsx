import {Flex, MainLayout, Text} from '@/components';

// Themes
import {metrics} from '@/themes';

const OrderListScreen = () => {
  return (
    <MainLayout>
      <Flex paddingHorizontal={metrics.dimensions.xxl}>
        <Text variant="heading">Orders Screen</Text>
      </Flex>
    </MainLayout>
  );
};

export default OrderListScreen;
