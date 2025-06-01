import {useEffect, useState} from 'react';
import {DevSettings} from 'react-native';

// Stores
import {useAuthStore, useBootstrapsStore} from '@/stores';

// Navigation
import {Navigation} from '@/navigation';

// Utils
import {createNotificationChannel} from '@/utils';

// Components
import {Flex, Text} from '@/components';

createNotificationChannel();

const App = () => {
  const [showStorybook, setShowStorybook] = useState(false);

  const {bootHydrated} = useBootstrapsStore();
  const {authHydrated} = useAuthStore();

  useEffect(() => {
    if (__DEV__) {
      // Toggle Storybook
      DevSettings.addMenuItem('Toggle Storybook', () => {
        setShowStorybook(prev => !prev);
      });
    }
  }, []);

  if (showStorybook) {
    const StorybookUI = require('./.storybook')?.default;

    return <StorybookUI />;
  }

  if (!(bootHydrated && authHydrated)) {
    return (
      <Flex flex={1}>
        <Text>Loading</Text>
      </Flex>
    );
  }

  return <Navigation />;
};

export default App;
