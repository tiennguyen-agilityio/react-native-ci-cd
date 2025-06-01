import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Interfaces
import {AppStackParamList, SCREENS} from '@/interfaces';

// Screens
import {LoginScreen} from '@/screens';

const AuthStackNavigator = () => {
  const Stack = createNativeStackNavigator<AppStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={SCREENS.LOGIN} component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
