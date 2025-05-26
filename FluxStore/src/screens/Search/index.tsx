import {Flex, MainLayout, Text} from '@/components';

// Themes
import {metrics} from '@/themes';

const SearchScreen = () => {
  return (
    <MainLayout>
      <Flex paddingHorizontal={metrics.dimensions.xxl}>
        <Text variant="heading">Search Screen</Text>
      </Flex>
    </MainLayout>
  );
};

export default SearchScreen;
