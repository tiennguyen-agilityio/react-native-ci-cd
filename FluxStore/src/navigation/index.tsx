import {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {KeyboardProvider} from 'react-native-keyboard-controller';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import messaging, {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import perf from '@react-native-firebase/perf';

// Interfaces
import {AppStackParamList, SCREENS} from '@/interfaces';

// Constants
import {linking} from './Linking';

// Stores
import {useAuthStore} from '@/stores';
import {useBootstrapsStore} from '@/stores';

// Stacks | Screens
import OnboardingStack from './OnboardingStack';
import AuthStack from './AuthStack';
import TabsStack from './TabsStack';
import CartStack from './CartStack';
import OrderStack from './OrderStack';
import ProductStack from './ProductStack';
import ProfileStack from './ProfileStack';

// Utils
import {getDeviceToken} from '@/utils';

const AppStack = createNativeStackNavigator<AppStackParamList>();

export const Navigation = () => {
  const queryClient = new QueryClient();

  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const isFirstLoad = useBootstrapsStore(state => state.isFirstLoad);
  useEffect(() => {
    getDeviceToken();

    const unsubscribe = messaging().onMessage(
      async ({notification}: FirebaseMessagingTypes.RemoteMessage) => {
        Toast.show({
          type: 'info',
          text1: notification?.title,
          text2: notification?.body,
        });
      },
    );

    return unsubscribe;
  }, []);

  useEffect(() => {
    const startPerf = async () => {
      const trace = await perf().startTrace('app_launch_trace');
      // simulate load time
      setTimeout(async () => {
        await trace.stop();
      }, 1500);
    };

    startPerf();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <KeyboardProvider>
        <NavigationContainer linking={linking}>
          <GestureHandlerRootView>
            <AppStack.Navigator
              screenOptions={{
                headerShown: false,
              }}>
              {isAuthenticated ? (
                <AppStack.Group>
                  <AppStack.Screen name={SCREENS.TABS} component={TabsStack} />
                  <AppStack.Screen name={SCREENS.PRODUCT_STACK} component={ProductStack} />
                  <AppStack.Screen name={SCREENS.CART_STACK} component={CartStack} />
                  <AppStack.Screen name={SCREENS.ORDER_STACK} component={OrderStack} />
                  <AppStack.Screen name={SCREENS.PROFILE_STACK} component={ProfileStack} />
                </AppStack.Group>
              ) : isFirstLoad ? (
                <AppStack.Group>
                  <AppStack.Screen name={SCREENS.ONBOARDING_STACK} component={OnboardingStack} />
                  <AppStack.Screen name={SCREENS.AUTH_STACK} component={AuthStack} />
                </AppStack.Group>
              ) : (
                <AppStack.Screen name={SCREENS.AUTH_STACK} component={AuthStack} />
              )}
            </AppStack.Navigator>
            <Toast />
          </GestureHandlerRootView>
        </NavigationContainer>
      </KeyboardProvider>
    </QueryClientProvider>
  );
};
