import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Interfaces
import {OrderStackParamList, SCREENS} from '@/interfaces';

// Screens
import {ShippingAddressScreen, OrderCompletedScreen} from '@/screens';

const Stack = createNativeStackNavigator<OrderStackParamList>();

const OrderStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={SCREENS.SHIPPING_ADDRESS} component={ShippingAddressScreen} />
      <Stack.Screen name={SCREENS.ORDER_COMPLETED} component={OrderCompletedScreen} />
    </Stack.Navigator>
  );
};

export default OrderStack;
