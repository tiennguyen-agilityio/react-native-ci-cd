import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {KeyboardProvider} from 'react-native-keyboard-controller';

import {AppStackNavigation} from './AppStackNavigation';

export const Navigation = () => {
  return (
    <KeyboardProvider>
      <NavigationContainer>
        <GestureHandlerRootView>
          <AppStackNavigation />
        </GestureHandlerRootView>
      </NavigationContainer>
    </KeyboardProvider>
  );
};
