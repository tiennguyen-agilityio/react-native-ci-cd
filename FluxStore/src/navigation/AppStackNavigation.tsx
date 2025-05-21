import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Interfaces
import {AppStackParamList, SCREENS} from '@/interfaces';

// Screens
import MainTab from './MainTab';
import {WelcomeScreen} from '@/screens';

const AppStack = createNativeStackNavigator<AppStackParamList>();

export const AppStackNavigation = () => {
  return (
    <AppStack.Navigator
      initialRouteName={SCREENS.WELCOME}
      screenOptions={{
        headerShown: false,
      }}>
      <AppStack.Screen name={SCREENS.MAIN_TAB} component={MainTab} />
      <AppStack.Screen name={SCREENS.WELCOME} component={WelcomeScreen} />
    </AppStack.Navigator>
  );
};
