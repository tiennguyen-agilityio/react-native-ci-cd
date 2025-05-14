import {Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

// Interfaces
import {AppStackScreenProps, SCREENS} from '@/interfaces';

type LandingScreenProps = AppStackScreenProps<typeof SCREENS.HOME>;

const Home = (props: LandingScreenProps) => {
  return (
    <SafeAreaView>
      <Text>Home Screen</Text>
    </SafeAreaView>
  );
};

export default Home;
