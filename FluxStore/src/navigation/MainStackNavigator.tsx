import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Interfaces
import {AppStackParamList, SCREENS} from '@/interfaces';

// Screens
import {ProductDetailScreen, ProductsScreen} from '@/screens';
import MainTab from './MainTab';
import CartStackNavigator from './CartStackNavigator';

const Stack = createNativeStackNavigator<AppStackParamList>();

const MainStackNavigator = () => {
  return (
    <Stack.Group
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={SCREENS.MAIN_TAB} component={MainTab} />
      <Stack.Screen name={SCREENS.PRODUCTS} component={ProductsScreen} />
      <Stack.Screen name={SCREENS.PRODUCT_DETAIL} component={ProductDetailScreen} />
      <Stack.Screen name={SCREENS.CART_STACK} component={CartStackNavigator} />
    </Stack.Group>
  );
};

export default MainStackNavigator;
