import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Interfaces
import {ProductStackParamList, SCREENS} from '@/interfaces';

// Screens
import {ProductsScreen, ProductDetailScreen} from '@/screens';

const Stack = createNativeStackNavigator<ProductStackParamList>();

const ProductStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={SCREENS.PRODUCTS} component={ProductsScreen} />
      <Stack.Screen name={SCREENS.PRODUCT_DETAIL} component={ProductDetailScreen} />
    </Stack.Navigator>
  );
};

export default ProductStack;
