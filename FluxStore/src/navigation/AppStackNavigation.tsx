import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Interfaces
import {AppStackParamList, SCREENS} from '@/interfaces';

// Screens | Tabs
import {IntroScreen, ProductsScreen, WelcomeScreen, ProductDetailScreen} from '@/screens';
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
      <AppStack.Screen name={SCREENS.WELCOME} component={WelcomeScreen} />
      <AppStack.Screen name={SCREENS.PRODUCTS} component={ProductsScreen} />
      <AppStack.Screen name={SCREENS.INTRO} component={IntroScreen} />
      <AppStack.Screen name={SCREENS.PRODUCT_DETAIL} component={ProductDetailScreen} />
    </AppStack.Navigator>
  );
};
