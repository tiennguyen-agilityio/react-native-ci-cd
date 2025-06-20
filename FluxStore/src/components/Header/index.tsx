import {memo, useCallback, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

// Types
import {AppStackParamList, DIRECTION, SCREENS} from '@/interfaces';

// Hooks | Stores
import {useThemeStore} from '@/stores';

import {useAuthStore} from '@/stores';

// Themes
import {metrics} from '@/themes';

// Components
import {ChevronIcon, HeartIcon, MenuIcon, NotificationIcon} from '../Icons';
import Flex from '../Flex';
import Text from '../Text';

const Header = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList, keyof AppStackParamList>>();
  const route = useRoute();
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  const {
    theme: {background, text},
  } = useThemeStore();
  const {name = ''} = route;

  const handleShowMenu = useCallback(() => null, []);

  const handleShowNotification = useCallback(() => null, []);

  const handleGoToBack = useCallback(() => {
    if (navigation.canGoBack()) {
      return navigation.goBack();
    } else if (isAuthenticated) {
      return navigation.reset({
        index: 0,
        routes: [
          {
            name: SCREENS.TABS,
            state: {
              index: 0,
              routes: [{name: SCREENS.HOME}],
            },
          },
        ],
      });
    }
    return navigation.navigate(SCREENS.AUTH_STACK, {
      screen: SCREENS.LOGIN,
    });
  }, [navigation, isAuthenticated]);

  const handleChangeFavorite = useCallback(() => {}, []);

  const styles = useMemo(
    () =>
      StyleSheet.create({
        icon: {
          minWidth: 50,
        },
        iconBack: {
          width: 36,
          height: 36,
          borderRadius: 36,
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: text.primary,
          backgroundColor: background.default,
          shadowOffset: {width: 0, height: 0},
          shadowOpacity: 0.4,
          shadowRadius: 6,
          elevation: 12,
        },
      }),
    [text, background],
  );

  const header = useMemo(() => {
    switch (name) {
      case SCREENS.HOME: {
        return {
          title: 'Fluxstore',
          leftIcon: <MenuIcon onPress={handleShowMenu} />,
          rightIcon: <NotificationIcon onPress={handleShowNotification} />,
        };
      }

      case SCREENS.PRODUCTS: {
        return {
          title: '',
          leftIcon: (
            <Flex direction="row" align="center" gap={20}>
              <ChevronIcon
                direction={DIRECTION.LEFT}
                style={styles.iconBack}
                onPress={handleGoToBack}
              />
              <Text>Dresses</Text>
            </Flex>
          ),
        };
      }

      case SCREENS.PRODUCT_DETAIL: {
        return {
          title: '',
          leftIcon: (
            <ChevronIcon
              direction={DIRECTION.LEFT}
              style={styles.iconBack}
              onPress={handleGoToBack}
            />
          ),
          rightIcon: <HeartIcon onPress={handleChangeFavorite} />,
        };
      }

      case SCREENS.CART: {
        return {
          title: 'Your Cart',
          leftIcon: (
            <ChevronIcon
              direction={DIRECTION.LEFT}
              style={styles.iconBack}
              onPress={handleGoToBack}
            />
          ),
        };
      }

      case SCREENS.SHIPPING_ADDRESS:
      case SCREENS.ORDER_COMPLETED: {
        return {
          title: 'Check out',
          leftIcon: (
            <ChevronIcon
              direction={DIRECTION.LEFT}
              style={styles.iconBack}
              onPress={handleGoToBack}
            />
          ),
        };
      }

      default: {
        return undefined;
      }
    }
  }, [
    name,
    styles.iconBack,
    handleGoToBack,
    handleShowMenu,
    handleChangeFavorite,
    handleShowNotification,
  ]);

  if (!header) {
    return null;
  }

  const {title = '', leftIcon = null, rightIcon = null} = header || {};

  return (
    <Flex
      direction="row"
      justify="between"
      align="center"
      height={44}
      marginBottom={0}
      backgroundColor={background.default}
      paddingHorizontal={metrics.dimensions.xxl}>
      <Flex align="start" style={styles.icon}>
        {leftIcon && leftIcon}
      </Flex>
      <Flex>{title && <Text variant="title">{title}</Text>}</Flex>
      <Flex align="end" style={styles.icon}>
        {rightIcon && rightIcon}
      </Flex>
    </Flex>
  );
};

export default memo(Header);
