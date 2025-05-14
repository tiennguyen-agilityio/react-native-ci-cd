import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Interfaces
import {AppStackParamList, SCREENS} from '@/interfaces';

// Screens
import MainTab from './MainTab';

const AppStack = createNativeStackNavigator<AppStackParamList>();

export const AppStackNavigation = () => {
  return (
    <AppStack.Navigator
      initialRouteName={SCREENS.MAIN_TAB}
      screenOptions={{
        headerShown: false,
      }}>
      <AppStack.Screen name={SCREENS.MAIN_TAB} component={MainTab} />
    </AppStack.Navigator>
  );
};
