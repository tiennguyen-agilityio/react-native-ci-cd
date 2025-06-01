import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Constants

// Interfaces
import {AppStackParamList, SCREENS} from '@/interfaces';

// Stores
import {useAuthStore, useBootstrapsStore} from '@/stores';

// Screens
import {IntroScreen, ProductsScreen, WelcomeScreen, ProductDetailScreen} from '@/screens';
import MainTab from './MainTab';
import CartStackNavigator from './CartStackNavigator';
import AuthStackNavigator from './AuthStackNavigator';

const AppStack = createNativeStackNavigator<AppStackParamList>();

export const AppStackNavigation = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const isFirstLoad = useBootstrapsStore(state => state.isFirstLoad);

  return (
    <AppStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {isAuthenticated ? (
        <AppStack.Group>
          <AppStack.Screen name={SCREENS.MAIN_TAB} component={MainTab} />
          <AppStack.Screen name={SCREENS.CART_STACK} component={CartStackNavigator} />
          <AppStack.Screen name={SCREENS.PRODUCTS} component={ProductsScreen} />
          <AppStack.Screen name={SCREENS.PRODUCT_DETAIL} component={ProductDetailScreen} />
        </AppStack.Group>
      ) : isFirstLoad ? (
        <AppStack.Group>
          <AppStack.Screen name={SCREENS.WELCOME} component={WelcomeScreen} />
          <AppStack.Screen name={SCREENS.INTRO} component={IntroScreen} />
          <AppStack.Screen name={SCREENS.AUTH_STACK} component={AuthStackNavigator} />
        </AppStack.Group>
      ) : (
        <AppStack.Screen name={SCREENS.AUTH_STACK} component={AuthStackNavigator} />
      )}
    </AppStack.Navigator>
  );
};
