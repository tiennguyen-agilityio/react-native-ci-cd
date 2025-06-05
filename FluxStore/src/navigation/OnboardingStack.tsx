import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Interfaces
import {OnboardingStackParamList, SCREENS} from '@/interfaces';

// Screens
import {WelcomeScreen, IntroScreen} from '@/screens';

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

const OnboardingStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={SCREENS.WELCOME} component={WelcomeScreen} />
      <Stack.Screen name={SCREENS.INTRO} component={IntroScreen} />
    </Stack.Navigator>
  );
};

export default OnboardingStack;
