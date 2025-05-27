import {RefObject, useCallback, useRef} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {TextInput} from 'react-native';

// Interfaces
import {AppStackScreenProps, SCREENS} from '@/interfaces';

// Constants

// Hooks
import {useThemeStore} from '@/hooks';

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

type LoginScreenProps = AppStackScreenProps<typeof SCREENS.ORDER_COMPLETED>;

const LoginScreen = ({navigation}: LoginScreenProps) => {
  const insets = useSafeAreaInsets();

  const passwordRef = useRef<TextInput>();

  const {
    toggleTheme,
    theme: {text, icon},
  } = useThemeStore();

  const handleChangeInput = (value: string, field?: string) => {
    console.log('value', value, field);
  };

  const handleFocusNextField = (input: RefObject<TextInput>) => {
    input.current.focus();
  };

  const handleLogin = useCallback(() => {
    navigation.navigate(SCREENS.MAIN_TAB, {
      screen: SCREENS.HOME,
    });
  }, [navigation]);

  const handleForgotPassword = useCallback(() => {}, []);

  return (
    <MainLayout>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Flex minHeight="100%" paddingHorizontal={metrics.dimensions.xxl}>
          <Text
            variant="heading"
            fontSize={fontSizes.xl}
            lineHeight={48}
            fontWeight={fontWeights.semiBold}>
            {`Log into\nyour account`}
          </Text>
          <Flex gap={20}>
            <Input
              isRequired
              nextField={passwordRef}
              placeholder="Email address"
              onChangeText={handleChangeInput}
              onSubmit={handleFocusNextField}
            />
            <Input
              isRequired
              ref={passwordRef}
              placeholder="Password"
              onChangeText={handleChangeInput}
            />
          </Flex>
          <Flex marginTop={28} justify="end" align="end">
            <Button
              disabled
              text="Forgot Password?"
              variant="ghost"
              color={text.quaternary}
              fontSize={fontSizes.tiny}
              onPress={handleForgotPassword}
            />
          </Flex>
          <Flex align="center" marginTop={35} gap={24} marginBottom={insets.bottom}>
            <Button text="Login" width={147} onPress={handleLogin} />
            <Text fontSize={fontSizes.tiny} color={text.quaternary} fontWeight={200}>
              or log in with
            </Text>
            <Flex direction="row" gap={20}>
              <AppleIcon />
              <GoogleIcon />
              <FacebookIcon />
            </Flex>
          </Flex>
          <Flex marginTop="auto" direction="row" align="center" justify="center" gap={7}>
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
              onPress={handleForgotPassword}
            />
          </Flex>
        </Flex>
      </ScrollView>
    </MainLayout>
  );
};

export default LoginScreen;
