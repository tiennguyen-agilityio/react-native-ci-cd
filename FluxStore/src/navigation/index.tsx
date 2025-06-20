import {useEffect, useRef} from 'react';
import {NavigationContainer, useNavigationContainerRef} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {KeyboardProvider} from 'react-native-keyboard-controller';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import {StatusBar} from 'react-native';

// Interfaces
import {AppStackParamList, SCREENS} from '@/interfaces';

// Constants
import {linking} from '@/configs';

// Stores
import {useAuthStore, useDeepLinkStore, useBootstrapsStore, useThemeStore} from '@/stores';

// Stacks | Screens
import OnboardingStack from './OnboardingStack';
import AuthStack from './AuthStack';
import TabsStack from './TabsStack';
import CartStack from './CartStack';
import OrderStack from './OrderStack';
import ProductStack from './ProductStack';
import ProfileStack from './ProfileStack';

const AppStack = createNativeStackNavigator<AppStackParamList>();

export const Navigation = () => {
  const queryClient = new QueryClient();
  const navigationRef = useNavigationContainerRef<AppStackParamList>();
  const {
    isDark,
    theme: {background},
  } = useThemeStore();
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const isFirstLoad = useBootstrapsStore(state => state.isFirstLoad);
  const [pendingDeepLink, setPendingDeepLink] = useDeepLinkStore(state => [
    state.pendingDeepLink,
    state.setPendingDeepLink,
  ]);

  const hasNavigatedRef = useRef(false);

  useEffect(() => {
    if (isAuthenticated && pendingDeepLink && navigationRef.isReady() && !hasNavigatedRef.current) {
      if (pendingDeepLink) {
        const {stack, screen, params} = pendingDeepLink;
        if (stack && screen) {
          navigationRef.navigate(stack as keyof AppStackParamList, {screen, params} as never);
        } else {
          navigationRef.navigate(screen as keyof AppStackParamList, params as never);
        }
      }
      hasNavigatedRef.current = true;
      setPendingDeepLink(null);
    }
  }, [isAuthenticated, pendingDeepLink, navigationRef, setPendingDeepLink]);

  return (
    <GestureHandlerRootView>
      <QueryClientProvider client={queryClient}>
        <KeyboardProvider statusBarTranslucent navigationBarTranslucent>
          <StatusBar
            backgroundColor={background.default}
            barStyle={isDark ? 'light-content' : 'dark-content'}
          />
          <NavigationContainer linking={linking} ref={navigationRef}>
            <AppStack.Navigator
              screenOptions={{
                headerShown: false,
              }}>
              {isAuthenticated ? (
                <>
                  <AppStack.Screen name={SCREENS.TABS} component={TabsStack} />
                  <AppStack.Screen name={SCREENS.PRODUCT_STACK} component={ProductStack} />
                  <AppStack.Screen name={SCREENS.CART_STACK} component={CartStack} />
                  <AppStack.Screen name={SCREENS.ORDER_STACK} component={OrderStack} />
                  <AppStack.Screen name={SCREENS.PROFILE_STACK} component={ProfileStack} />
                </>
              ) : isFirstLoad ? (
                <>
                  <AppStack.Screen name={SCREENS.ONBOARDING_STACK} component={OnboardingStack} />
                  <AppStack.Screen name={SCREENS.AUTH_STACK} component={AuthStack} />
                </>
              ) : (
                <AppStack.Screen name={SCREENS.AUTH_STACK} component={AuthStack} />
              )}
            </AppStack.Navigator>
            <Toast />
          </NavigationContainer>
        </KeyboardProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
};
