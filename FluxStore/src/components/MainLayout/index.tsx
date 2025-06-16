import {ReactNode, memo, useMemo} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

// Hooks
import {useThemeStore} from '@/stores';

// Components
import Header from '../Header';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({children}: MainLayoutProps) => {
  const {
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
      <Header />
      {children}
    </SafeAreaView>
  );
};

export default memo(MainLayout);
