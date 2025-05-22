import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Interfaces
import {AppStackParamList, SCREENS} from '@/interfaces';

// Screens | Tabs
import MainTab from './MainTab';
import {IntroScreen, WelcomeScreen} from '@/screens';

const AppStack = createNativeStackNavigator<AppStackParamList>();

export const AppStackNavigation = () => {
  return (
    <AppStack.Navigator
      initialRouteName={SCREENS.INTRO}
      screenOptions={{
        headerShown: false,
      }}>
      <AppStack.Screen name={SCREENS.MAIN_TAB} component={MainTab} />
      <AppStack.Screen name={SCREENS.WELCOME} component={WelcomeScreen} />
      <AppStack.Screen name={SCREENS.INTRO} component={IntroScreen} />
    </AppStack.Navigator>
  );
};
