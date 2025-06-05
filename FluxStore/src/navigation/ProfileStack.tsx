import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Interfaces
import {ProfileStackParamList, SCREENS} from '@/interfaces';

// Screens
import {ProfileScreen} from '@/screens';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

const ProductStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={SCREENS.PROFILE} component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default ProductStack;
