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

  // const appStartTrace = useRef<ReturnType<any> | null>(null);
  // const appStartTime = useRef(Date.now());

  // useEffect(() => {
  //   const startTrace = async () => {
  //     const trace = await perf().newTrace('app_start_time');
  //     await trace.start();
  //     appStartTrace.current = trace;
  //   };

  //   startTrace();
  // }, []);

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
      // const now = Date.now();
      // const duration = now - appStartTime.current;

      // const stopTrace = async () => {
      //   const trace = appStartTrace.current;
      //   if (trace) {
      //     trace.putMetric('duration_ms', duration);
      //     await trace.stop();
      //     console.log(`🔥 App start trace logged: ${duration}ms`);
      //   }
      // };

      // stopTrace();
      BootSplash.hide({fade: true});
    }
  }, [bootHydrated, authHydrated]);

  if (showStorybook) {
    const StorybookUI = require('./.storybook')?.default;

    return <StorybookUI />;
  }

  if (!(bootHydrated && authHydrated)) {
    return null;
  }

  return <Navigation />;
};

export default App;
