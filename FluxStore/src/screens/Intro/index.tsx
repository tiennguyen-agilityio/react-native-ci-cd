import {memo, useCallback} from 'react';
import {ScrollView} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

// Interfaces
import {AppStackScreenProps, SCREENS} from '@/interfaces';

// Hooks
import {useScreenTrace} from '@/hooks';

// Components
import {Button, Flex} from '@/components';
import {Carousel} from './components';

//Themes
import {colors, metrics} from '@/themes';

type IntroScreenProps = AppStackScreenProps<typeof SCREENS.INTRO>;

const IntroScreen = ({navigation}: IntroScreenProps) => {
  useScreenTrace(SCREENS.INTRO);
  const insets = useSafeAreaInsets();

  const handleNextStep = useCallback(() => {
    navigation.navigate(SCREENS.LOGIN);
  }, [navigation]);

  return (
    <ScrollView>
      <Flex
        align="center"
        position="relative"
        backgroundColor={colors.gray[900]}
        paddingHorizontal={20}>
        <Flex
          position="absolute"
          width={metrics.screenWidth}
          height={461}
          zIndex={0}
          backgroundColor={colors.white[500]}
        />
        <Flex direction="row" justify="start" marginTop={insets.top + 50}>
          <Carousel />
        </Flex>
        <Flex align="center" height="100%" width="100%" marginTop={27}>
          <Button text="Shopping now" variant="outlined" width={193} onPress={handleNextStep} />
        </Flex>
      </Flex>
    </ScrollView>
  );
};

export default memo(IntroScreen);
