import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Interfaces
import {AuthStackParamList, SCREENS} from '@/interfaces';

// Screens
import {LoginScreen} from '@/screens';

const AuthStack = () => {
  const Stack = createNativeStackNavigator<AuthStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={SCREENS.LOGIN} component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
