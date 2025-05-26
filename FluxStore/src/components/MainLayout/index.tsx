import {ReactNode, memo, useMemo} from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

// Hooks
import {useThemeStore} from '@/hooks';

// Components
import Header from '../Header';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({children}: MainLayoutProps) => {
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
      <Header />
      {children}
    </SafeAreaView>
  );
};

export default memo(MainLayout);
