import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {KeyboardProvider} from 'react-native-keyboard-controller';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import {AppStackNavigation} from './AppStackNavigation';
import {linking} from './Linking';

export const Navigation = () => {
  const queryClient = new QueryClient();

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
