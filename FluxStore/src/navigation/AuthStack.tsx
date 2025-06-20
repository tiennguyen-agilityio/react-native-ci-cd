import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Interfaces
import {AuthStackParamList, SCREENS} from '@/interfaces';

// Screens
import {LoginScreen} from '@/screens';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name={SCREENS.LOGIN} component={LoginScreen} />
  </Stack.Navigator>
);

export default AuthStack;
