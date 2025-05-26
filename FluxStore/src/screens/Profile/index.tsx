import {memo} from 'react';

// Components
import {MainLayout, Text, Flex} from '@/components';

// Themes
import {metrics} from '@/themes';

const ProfileScreen = () => {
  return (
    <MainLayout>
      <Flex paddingHorizontal={metrics.dimensions.xxl}>
        <Text variant="heading">Profile Screen</Text>
      </Flex>
    </MainLayout>
  );
};

export default memo(ProfileScreen);
