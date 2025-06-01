import {useCallback} from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

// Interfaces
import {AppStackScreenProps, SCREENS} from '@/interfaces';

// Hooks
import {useScreenTrace} from '@/hooks';

// Components
import {Button, Flex, Text} from '@/components';

// Themes
import {colors, fontSizes, fontWeights, Images, letterSpacings, metrics} from '@/themes';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'relative',
  },
  content: {
    width: metrics.screenWidth,
    height: metrics.screenHeight,
    backgroundColor: colors.black[50],
  },
  heading: {
    color: colors.white[500],
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.semiBold,
    letterSpacing: letterSpacings.sm,
  },
  text: {
    color: colors.white[500],
    fontSize: fontSizes.sm,
  },
});

type WelcomeScreenProps = AppStackScreenProps<typeof SCREENS.WELCOME>;

const WelcomeScreen = ({navigation}: WelcomeScreenProps) => {
  useScreenTrace(SCREENS.WELCOME);

  const insets = useSafeAreaInsets();

  const handleGetStarted = useCallback(() => {
    navigation.navigate(SCREENS.INTRO);
  }, [navigation]);

  return (
    <Flex style={styles.wrapper}>
      <ImageBackground resizeMode="cover" source={Images.welcome}>
        <Flex
          gap={60}
          justify="end"
          align="center"
          style={styles.content}
          paddingBottom={insets.bottom + 90}>
          <Flex gap={13} justify="center" align="center">
            <Text variant="heading" style={styles.heading}>
              Welcome to Fluxstore!{' '}
            </Text>
            <Text style={styles.text}>The home for a fashionista</Text>
          </Flex>
          <Button text="Get Started" variant="outlined" width={193} onPress={handleGetStarted} />
        </Flex>
      </ImageBackground>
    </Flex>
  );
};

export default WelcomeScreen;
