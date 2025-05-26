import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {AppStackParamList, SCREENS} from '@/interfaces';
import {CartScreen, ShippingAddressScreen} from '@/screens';

const Stack = createNativeStackNavigator<AppStackParamList>();

const CartStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={SCREENS.SHIPPING_ADDRESS}
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name={SCREENS.CART} component={CartScreen} />
      <Stack.Screen name={SCREENS.SHIPPING_ADDRESS} component={ShippingAddressScreen} />
    </Stack.Navigator>
  );
};

export default CartStack;
