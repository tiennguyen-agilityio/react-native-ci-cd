import {useWindowDimensions} from 'react-native';

// Constants
import {MEDIA_SCREEN} from '@/constants';

export const useMedia = () => {
  const {width, height} = useWindowDimensions();

  return {
    width,
    height,
    isSmallMobile: width <= MEDIA_SCREEN.SMALL_MOBILE,
    isMobile: width < MEDIA_SCREEN.TABLET,
    isTablet: width >= MEDIA_SCREEN.TABLET,
  };
};
