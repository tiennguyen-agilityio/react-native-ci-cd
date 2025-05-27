import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {AppStackParamList, SCREENS} from '@/interfaces';
import {CartScreen, ShippingAddressScreen} from '@/screens';
import OrderCompletedScreen from '../screens/OrderCompleted/index';

const Stack = createNativeStackNavigator<AppStackParamList>();

const CartStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={SCREENS.CART}
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name={SCREENS.CART} component={CartScreen} />
      <Stack.Screen name={SCREENS.SHIPPING_ADDRESS} component={ShippingAddressScreen} />
      <Stack.Screen name={SCREENS.ORDER_COMPLETED} component={OrderCompletedScreen} />
    </Stack.Navigator>
  );
};

export default CartStack;
