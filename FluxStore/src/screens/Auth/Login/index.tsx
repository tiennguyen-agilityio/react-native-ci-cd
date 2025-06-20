import {useCallback, useMemo, useState} from 'react';
import {useForm} from 'react-hook-form';
import {ScrollView} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import crashlytics from '@react-native-firebase/crashlytics';
import notifee from '@notifee/react-native';

// Interfaces
import {LoginPayLoad, SCREENS, User} from '@/interfaces';

// Constants
import {ERROR_MESSAGES, SCHEMA} from '@/constants';

// Hooks
import {useAuth, useFocusInput, useScreenTrace} from '@/hooks';
import {useThemeStore, useAuthStore, useDeepLinkStore} from '@/stores';

// Themes
import {fontSizes, fontWeights, metrics} from '@/themes';

// Components
import {
  AppleIcon,
  Button,
  Flex,
  GoogleIcon,
  MainLayout,
  Text,
  FacebookIcon,
  ControllerInput,
} from '@/components';
import {customTrace} from '@/utils';

const LoginScreen = () => {
  useScreenTrace(SCREENS.LOGIN);
  const insets = useSafeAreaInsets();
  const {
    theme: {text},
  } = useThemeStore();
  const {pendingDeepLink, setPendingDeepLink} = useDeepLinkStore();

  const [setIsAuthenticated, setUser] = useAuthStore(state => [
    state.setIsAuthenticated,
    state.setUser,
  ]);

  const [errorMessage, setErrorMessage] = useState('');
  const {
    logIn: {mutate, isPending},
  } = useAuth();

  const defaultValues = useMemo(
    () => ({
      email: '',
      password: '',
    }),
    [],
  );

  const fields = Object.keys(defaultValues) as (keyof typeof defaultValues)[];

  const {fieldRefs, onFocus} = useFocusInput(fields);

  const {
    control,
    handleSubmit,
    reset,
    formState: {isSubmitting},
  } = useForm<LoginPayLoad>({
    defaultValues,
    mode: 'onBlur',
  });

  const handleClearErrorMessage = useCallback(() => setErrorMessage(''), []);

  const handleLogin = useCallback(
    async (data: LoginPayLoad) => {
      crashlytics().log('User login.');
      const {trace, traceStop} = await customTrace(SCREENS.LOGIN);

      mutate(data, {
        onSuccess: async (users: User[]) => {
          if (users?.length) {
            setUser(users[0]);
            setIsAuthenticated(true);
            await notifee.requestPermission();
            reset();
            setErrorMessage('');
            trace.putAttribute('login_status', 'success');
            crashlytics().log('User login success.');
          } else {
            setErrorMessage(ERROR_MESSAGES.LOGIN_FAILED);
          }
          traceStop();
        },
        onError: (error: Error) => {
          setErrorMessage(ERROR_MESSAGES.LOGIN_FAILED);
          crashlytics().recordError(error);
          trace.putAttribute('login_status', 'failure');
          traceStop();
        },
      });
    },
    [mutate, reset, setIsAuthenticated, setUser],
  );

  return (
    <MainLayout>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Flex flex={1} paddingTop={30} paddingHorizontal={metrics.dimensions.xxl} justify="between">
          <Text
            variant="heading"
            fontSize={fontSizes.xl}
            lineHeight={48}
            fontWeight={fontWeights.semiBold}>
            {`Log into\nyour account`}
          </Text>
          <Flex gap={20} marginTop={48}>
            <ControllerInput<LoginPayLoad>
              name="email"
              rules={SCHEMA.email}
              inputRef={fieldRefs.email}
              nextField="password"
              control={control}
              placeholder="Email address"
              clearError={handleClearErrorMessage}
              onFocusNextInput={onFocus}
            />

            <ControllerInput<LoginPayLoad>
              name="password"
              rules={SCHEMA.password}
              inputRef={fieldRefs.password}
              control={control}
              placeholder="Password"
              secureTextEntry
              returnKeyType="done"
              clearError={handleClearErrorMessage}
            />
          </Flex>
          <Flex marginTop={28} justify="end" align="end">
            <Button
              disabled
              text="Forgot Password?"
              variant="ghost"
              color={text.quaternary}
              fontSize={fontSizes.tiny}
              onPress={() => {}}
            />
          </Flex>
          <Flex flex={1} align="center" marginTop={35} gap={24} marginBottom={insets.bottom}>
            {errorMessage && <Text color={text.error}>{errorMessage}</Text>}
            <Button
              text="Login"
              width={147}
              isLoading={isSubmitting || isPending}
              onPress={handleSubmit(handleLogin)}
            />
            <Text fontSize={fontSizes.tiny} color={text.quaternary} fontWeight={200}>
              or log in with
            </Text>
            <Flex direction="row" gap={20}>
              <AppleIcon />
              <GoogleIcon />
              <FacebookIcon />
            </Flex>
          </Flex>
          <Flex
            marginTop={108}
            marginBottom={0}
            direction="row"
            align="center"
            justify="center"
            gap={7}>
            <Text fontSize={fontSizes.xs} color={text.primary}>
              Don’t have an account?
            </Text>
            <Button
              disabled
              text="Sign Up"
              variant="ghost"
              color={text.primary}
              fontSize={fontSizes.xs}
              textDecorationLine="underline"
              onPress={() => {}}
            />
          </Flex>
        </Flex>
      </ScrollView>
    </MainLayout>
  );
};

export default LoginScreen;
