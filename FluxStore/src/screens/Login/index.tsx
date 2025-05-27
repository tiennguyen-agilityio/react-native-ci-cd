import {RefObject, useCallback, useRef, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {ScrollView} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {TextInput} from 'react-native';

// Interfaces
import {AppStackScreenProps, LoginPayLoad, SCREENS, User} from '@/interfaces';

// Constants
import {ERROR_MESSAGES, SCHEMA} from '@/constants';

// Hooks
import {useAuth, useThemeStore} from '@/hooks';

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
import {userStore} from '@/stores';

type LoginScreenProps = AppStackScreenProps<typeof SCREENS.ORDER_COMPLETED>;

const LoginScreen = ({navigation}: LoginScreenProps) => {
  const insets = useSafeAreaInsets();
  const {
    theme: {text},
  } = useThemeStore();

  const setUser = userStore(state => state.setUser);

  const [errorMessage, setErrorMessage] = useState('');
  const passwordRef = useRef<TextInput>();

  const {
    logIn: {mutate},
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

  const handleFocusNextField = (input: RefObject<TextInput>) => {
    input.current.focus();
  };

  const handleLogin = useCallback(
    (data: LoginPayLoad) =>
      mutate(data, {
        onSuccess: (users: User[]) => {
          if (users?.length) {
            setUser(users[0]);
            navigation.navigate(SCREENS.MAIN_TAB, {
              screen: SCREENS.HOME,
            });
            reset();
            setErrorMessage('');
          } else {
            setErrorMessage(ERROR_MESSAGES.LOGIN_FAILED);
          }
        },
        onError: (error: Error) => {
          setErrorMessage(ERROR_MESSAGES.LOGIN_FAILED);
        },
      }),
    [mutate, navigation, reset, setUser],
  );

  return (
    <MainLayout>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Flex flex={1} paddingHorizontal={metrics.dimensions.xxl} justify="between">
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
              render={({field: {onChange, ...props}, fieldState: {error}}) => (
                <Input
                  {...props}
                  field="email"
                  nextField={passwordRef}
                  placeholder="Email address"
                  returnKeyType="next"
                  errorMessage={error?.message}
                  onChangeText={onChange}
                  onSubmit={handleFocusNextField}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              rules={SCHEMA.password}
              render={({field: {onChange, ref, ...props}, fieldState: {error}}) => (
                <Input
                  {...props}
                  ref={passwordRef}
                  secureTextEntry
                  placeholder="Password"
                  errorMessage={error?.message}
                  onChangeText={onChange}
                />
              )}
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
              isLoading={isSubmitting}
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
