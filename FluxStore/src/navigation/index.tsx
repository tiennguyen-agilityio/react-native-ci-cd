import {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {KeyboardProvider} from 'react-native-keyboard-controller';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import messaging, {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import Toast from 'react-native-toast-message';
import perf from '@react-native-firebase/perf';

import {AppStackNavigation} from './AppStackNavigation';
import {linking} from './Linking';

export const Navigation = () => {
  const queryClient = new QueryClient();

  useEffect(() => {
    // messaging()
    //   .getToken()
    //   .then(token => console.log('FCM Token:', token));

    const unsubscribe = messaging().onMessage(
      async ({notification}: FirebaseMessagingTypes.RemoteMessage) => {
        Toast.show({
          type: 'info',
          text1: notification?.title,
          text2: notification?.body,
        });
      },
    );

    return unsubscribe;
  }, []);

  useEffect(() => {
    const startPerf = async () => {
      const trace = await perf().startTrace('app_launch_trace');
      // simulate load time
      setTimeout(async () => {
        await trace.stop();
        console.log('App launch trace ended');
      }, 1500);
    };

    startPerf();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <KeyboardProvider>
        <NavigationContainer linking={linking}>
          <GestureHandlerRootView>
            <AppStackNavigation />
            <Toast />
          </GestureHandlerRootView>
        </NavigationContainer>
      </KeyboardProvider>
    </QueryClientProvider>
  );
};
