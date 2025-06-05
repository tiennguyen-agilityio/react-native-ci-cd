import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Interfaces
import {CartStackParamList, SCREENS} from '@/interfaces';

// Screens
import {CartScreen} from '@/screens';

const Stack = createNativeStackNavigator<CartStackParamList>();

const CartStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={SCREENS.CART} component={CartScreen} />
    </Stack.Navigator>
  );
};

export default CartStack;
