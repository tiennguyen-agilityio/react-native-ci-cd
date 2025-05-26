import {Flex, MainLayout, Text} from '@/components';

// Themes
import {metrics} from '@/themes';

const ShippingAddressScreen = () => {
  return (
    <MainLayout>
      <Flex paddingHorizontal={metrics.dimensions.xxl}>
        <Text variant="heading">ShippingAddress Screen</Text>
      </Flex>
    </MainLayout>
  );
};

export default ShippingAddressScreen;
