import {memo} from 'react';
import {
  DimensionValue,
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

// Hooks
import {useThemeStore} from '@/hooks';

// Themes
import {fontSizes, fontWeights, lineHeights} from '@/themes';

// Components
import Flex from '../Flex';
import Text from '../Text';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    overflow: 'hidden',
    paddingHorizontal: 16,
  },
  tag: {
    fontSize: fontSizes.tiny,
    fontWeight: fontWeights.semiBold,
    lineHeight: lineHeights.xs,
  },
  model: {
    position: 'absolute',
    bottom: 0,
    zIndex: 2,
  },
});

export enum PromoBannerType {
  Primary = 'primary',
  Secondary = 'secondary',
}

interface PromoBannerProps {
  title: string;
  tag: string;
  image: ImageSourcePropType;
  type?: PromoBannerType;
  height: DimensionValue;
  widthImage: number;
  heightImage: number;
  onPress: () => void;
}

const PromoBanner = ({
  title,
  tag,
  image,
  height,
  type,
  widthImage,
  heightImage,
  onPress,
}: PromoBannerProps) => {
  const {
    theme: {text, background, fonts},
  } = useThemeStore();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.container,
        {
          height,
          backgroundColor: background.tertiary,
        },
      ]}
      onPress={onPress}>
      <Flex width="50%" justify="center" align="center" gap={23}>
        <Text style={[styles.tag, {color: text.tertiary}]}>{tag}</Text>
        <Text
          variant="title"
          style={{
            color: text.secondary,
            fontWeight: fontWeights.regular,
            fontFamily: fonts.default.regular,
          }}>
          {title}
        </Text>
      </Flex>

      <Flex width="50%" justify="center" align="center" position="relative">
        <Flex
          position="absolute"
          opacity={0.5}
          width={132}
          height={132}
          borderRadius={132}
          backgroundColor={background.septenary}
        />
        <Flex width={102} height={102} borderRadius={102} backgroundColor={background.septenary} />
        <Image
          source={image}
          style={styles.model}
          width={widthImage}
          height={heightImage}
          resizeMode="cover"
        />
      </Flex>
    </TouchableOpacity>
  );
};

export default memo(PromoBanner);
