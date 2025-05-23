import {ReactNode, useCallback, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {BottomTabHeaderProps} from '@react-navigation/bottom-tabs';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {RouteProp} from '@react-navigation/native';

// Types
import {AppStackParamList, SCREENS} from '@/interfaces';

// Hooks | Stores
import {useThemeStore} from '@/hooks';

// Components
import {MenuIcon, NotificationIcon} from '../Icons';
import Flex from '../Flex';
import Text from '../Text';
import {metrics} from '@/themes';

const styles = StyleSheet.create({
  icon: {
    minWidth: 50,
  },
});

type HeaderProps =
  | NativeStackHeaderProps
  | BottomTabHeaderProps
  | {
      route: RouteProp<AppStackParamList, keyof AppStackParamList>;
    };

interface HeaderItem {
  title?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const Header = ({route}: HeaderProps) => {
  const {
    theme: {background},
  } = useThemeStore();
  const {name = ''} = route;

  const handleShowMenu = useCallback(() => null, []);
  const handleShowNotification = useCallback(() => null, []);

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
          onClickLeftIcon: handleShowMenu,
          rightIcon: <NotificationIcon onPress={handleShowNotification} />,
        };
      }

      default: {
        return {};
      }
    }
  }, [handleShowMenu, handleShowNotification, name]);

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
