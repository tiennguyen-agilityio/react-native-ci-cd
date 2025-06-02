import {RefObject, useCallback, useRef, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {ScrollView} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {TextInput} from 'react-native';
import crashlytics from '@react-native-firebase/crashlytics';

// Interfaces
import {LoginPayLoad, SCREENS, User} from '@/interfaces';

// Constants
import {ERROR_MESSAGES, SCHEMA} from '@/constants';

// Hooks
import {useAuth, useScreenTrace} from '@/hooks';
import {useThemeStore, useAuthStore} from '@/stores';

// Themes
import {fontSizes, fontWeights, metrics} from '@/themes';

// Components
import {
  AppleIcon,
  Button,
  Flex,
  GoogleIcon,
  Input,
  MainLayout,
  Text,
  FacebookIcon,
} from '@/components';
import {customTrace} from '@/utils';

const LoginScreen = () => {
  useScreenTrace(SCREENS.LOGIN);
  const insets = useSafeAreaInsets();
  const {
    theme: {text},
  } = useThemeStore();

  const [setIsAuthenticated, setUser] = useAuthStore(state => [
    state.setIsAuthenticated,
    state.setUser,
  ]);

  const [errorMessage, setErrorMessage] = useState('');
  const passwordRef = useRef<TextInput | null>(null);

  const {
    logIn: {mutate, isPending},
  } = useAuth();

  const {
    control,
    handleSubmit,
    reset,
    formState: {isSubmitting},
  } = useForm<LoginPayLoad>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur',
  });

  const handleFocusNextField = (input: RefObject<TextInput | null>) => {
    input?.current && input.current.focus();
  };

  const handleLogin = useCallback(
    async (data: LoginPayLoad) => {
      crashlytics().log('User login.');
      const {trace, traceStop} = await customTrace(SCREENS.LOGIN);

      mutate(data, {
        onSuccess: (users: User[]) => {
          if (users?.length) {
            setUser(users[0]);
            setIsAuthenticated(true);
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
            <Controller
              name="email"
              control={control}
              rules={SCHEMA.email}
              render={({field: {onChange, ...props}, fieldState: {error}}) => {
                const handleChange = event => {
                  setErrorMessage('');
                  onChange(event);
                };
                return (
                  <Input
                    {...props}
                    field="email"
                    nextField={passwordRef}
                    placeholder="Email address"
                    returnKeyType="next"
                    errorMessage={error?.message}
                    onChangeText={handleChange}
                    onSubmit={handleFocusNextField}
                  />
                );
              }}
            />

            <Controller
              name="password"
              control={control}
              rules={SCHEMA.password}
              render={({field: {onChange, ref, ...props}, fieldState: {error}}) => {
                const handleChange = event => {
                  setErrorMessage('');
                  onChange(event);
                };

                return (
                  <Input
                    {...props}
                    ref={passwordRef}
                    secureTextEntry
                    placeholder="Password"
                    errorMessage={error?.message}
                    onChangeText={handleChange}
                  />
                );
              }}
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
