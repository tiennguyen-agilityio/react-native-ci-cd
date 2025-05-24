import {ReactNode, useCallback, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';

// Types
import {DIRECTION, SCREENS} from '@/interfaces';

// Hooks | Stores
import {useThemeStore} from '@/hooks';

// Themes
import {metrics} from '@/themes';

// Components
import {ChevronIcon, MenuIcon, NotificationIcon} from '../Icons';
import Flex from '../Flex';
import Text from '../Text';

interface HeaderItem {
  title?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const Header = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const {
    theme: {background, text},
  } = useThemeStore();
  const {name = ''} = route;

  const handleShowMenu = useCallback(() => null, []);
  const handleShowNotification = useCallback(() => null, []);
  const handleGoToBack = useCallback(() => navigation.goBack(), [navigation]);

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
          shadowOffset: {width: 0, height: 3},
          shadowOpacity: 0.2,
          shadowRadius: 6,
          elevation: 4,
        },
      }),
    [text, background],
  );

  const {
    title = '',
    leftIcon = null,
    rightIcon = null,
  }: HeaderItem = useMemo(() => {
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
          onClickLeftIcon: handleShowMenu,
        };
      }

      default: {
        return {};
      }
    }
  }, [handleGoToBack, handleShowMenu, handleShowNotification, name, styles.iconBack]);

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

export default Header;
