import {ReactNode, memo, useMemo} from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RouteProp} from '@react-navigation/native';
import isEqual from 'react-fast-compare';

// Interfaces
import {AppStackParamList} from '@/interfaces';

// Hooks
import {useThemeStore} from '@/hooks';

// Themes

// Components
import Flex from '../Flex';
import Header from '../Header';

interface MainLayoutProps {
  children: ReactNode;
  route: RouteProp<AppStackParamList, keyof AppStackParamList>;
}

const MainLayout = ({children, route}: MainLayoutProps) => {
  const {
    isDark,
    theme: {background},
  } = useThemeStore();

  const styles = useMemo(
    () => ({
      wrapper: {
        flex: 1,
        backgroundColor: background.default,
      },
    }),
    [background],
  );

  return (
    <SafeAreaView style={styles.wrapper}>
      <StatusBar
        backgroundColor={background.default}
        barStyle={isDark ? 'light-content' : 'dark-content'}
      />
      <Header route={route} />
      <Flex flex={1} marginTop={0} paddingTop={0}>
        {children}
      </Flex>
    </SafeAreaView>
  );
};

export default memo(MainLayout, isEqual);
