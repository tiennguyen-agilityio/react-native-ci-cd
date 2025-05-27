import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {KeyboardProvider} from 'react-native-keyboard-controller';

import {AppStackNavigation} from './AppStackNavigation';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

export const Navigation = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <KeyboardProvider>
        <NavigationContainer>
          <GestureHandlerRootView>
            <AppStackNavigation />
          </GestureHandlerRootView>
        </NavigationContainer>
      </KeyboardProvider>
    </QueryClientProvider>
  );
};
