import {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {KeyboardProvider} from 'react-native-keyboard-controller';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import messaging from '@react-native-firebase/messaging';

import {AppStackNavigation} from './AppStackNavigation';
import {linking} from './Linking';

export const Navigation = () => {
  const queryClient = new QueryClient();
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('Foreground message received:', remoteMessage);
      // Handle the notification or data here
    });

    return unsubscribe;
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <KeyboardProvider>
        <NavigationContainer linking={linking}>
          <GestureHandlerRootView>
            <AppStackNavigation />
          </GestureHandlerRootView>
        </NavigationContainer>
      </KeyboardProvider>
    </QueryClientProvider>
  );
};
