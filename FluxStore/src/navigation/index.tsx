import {NavigationContainer} from '@react-navigation/native';

import {AppStackNavigation} from './AppStackNavigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export const Navigation = () => {
  return (
    <NavigationContainer>
      <GestureHandlerRootView>
        <AppStackNavigation />
      </GestureHandlerRootView>
    </NavigationContainer>
  );
};
