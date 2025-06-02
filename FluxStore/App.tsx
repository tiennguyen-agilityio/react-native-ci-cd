import {useEffect, useState} from 'react';
import {DevSettings} from 'react-native';
import BootSplash from 'react-native-bootsplash';

// Stores
import {useAuthStore, useBootstrapsStore} from '@/stores';

// Navigation
import {Navigation} from '@/navigation';

// Utils
import {createNotificationChannel} from '@/utils';

createNotificationChannel();

const App = () => {
  const [showStorybook, setShowStorybook] = useState(false);

  const {bootHydrated} = useBootstrapsStore();
  const {authHydrated} = useAuthStore();

  useEffect(() => {
    if (__DEV__) {
      DevSettings.addMenuItem('Toggle Storybook', () => {
        setShowStorybook(prev => !prev);
      });
    }
  }, []);

  useEffect(() => {
    if (bootHydrated && authHydrated) {
      BootSplash.hide({fade: true});
    }
  }, [bootHydrated, authHydrated]);

  if (showStorybook) {
    const StorybookUI = require('./.storybook')?.default;

    return <StorybookUI />;
  }

  if (!bootHydrated || !authHydrated) {
    return null;
  }

  return <Navigation />;
};

export default App;
