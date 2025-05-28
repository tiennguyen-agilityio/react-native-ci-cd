import {useEffect, useState} from 'react';
import {DevSettings} from 'react-native';

// Navigation
import {Navigation} from '@/navigation';

// Utils
import {createNotificationChannel} from '@/utils';

createNotificationChannel();

const App = () => {
  const [showStorybook, setShowStorybook] = useState(false);

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

  return <Navigation />;
};

export default App;
