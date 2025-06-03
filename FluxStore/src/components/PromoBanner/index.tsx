import {memo, useMemo} from 'react';
import {DimensionValue, ImageSourcePropType, StyleSheet, TouchableOpacity} from 'react-native';
import FastImage, {Source} from 'react-native-fast-image';

// Hooks
import {useThemeStore} from '@/stores';

// Themes
import {borderRadius, fontSizes, fontWeights, lineHeights} from '@/themes';

// Components
import Flex from '../Flex';
import Text from '../Text';

export enum PromoBannerType {
  Primary = 'primary',
  Secondary = 'secondary',
  Tertiary = 'tertiary',
  Quaternary = 'quaternary',
}

interface PromoBannerProps {
  title: string;
  tag: string;
  image: ImageSourcePropType;
  type?: PromoBannerType;
  isReversed?: boolean;
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
  type = PromoBannerType.Primary,
  widthImage,
  heightImage,
  isReversed = false,
  onPress,
}: PromoBannerProps) => {
  const {
    theme: {text, background, fonts},
  } = useThemeStore();

  const isPrimaryType = type === PromoBannerType.Primary;
  const isTertiaryType = type === PromoBannerType.Tertiary;
  const isQuaternaryType = type === PromoBannerType.Quaternary;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        wrapper: {
          flex: 1,
          flexDirection: isReversed ? 'row-reverse' : 'row',
          justifyContent: 'space-between',
          overflow: 'hidden',
          paddingLeft: isPrimaryType ? 55 : 24,
          paddingRight: 16,
          height,
          backgroundColor: background.tertiary,
          ...(!isPrimaryType && {
            borderRadius: borderRadius.sm,
          }),
        },
        title: {
          color: text.secondary,
          fontWeight: fontWeights.regular,
          fontFamily: fonts.default.regular,
          ...(isTertiaryType && {
            fontWeight: fontWeights.semiBold,
            letterSpacing: 1.4,
          }),
          ...(isQuaternaryType && {
            fontWeight: fontWeights.regular,
            fontSize: fontSizes.base,
            color: text.primary,
          }),
        },
        tag: {
          fontSize: fontSizes.tiny,
          fontWeight: fontWeights.semiBold,
          lineHeight: lineHeights.xs,
          ...(isQuaternaryType && {
            fontSize: fontSizes.xxs,
          }),
        },
        model: {
          position: 'absolute',
          top: 0,
          zIndex: 2,
          height: '100%',
        },
      }),
    [text, fonts, height, background, isReversed, isPrimaryType, isTertiaryType, isQuaternaryType],
  );

  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.wrapper} onPress={onPress}>
      <Flex flex={1} justify="center" align="start" gap={24}>
        <Text style={[styles.tag, {color: text.tertiary}]}>{tag}</Text>
        <Text variant="title" style={styles.title}>
          {title}
        </Text>
      </Flex>

      <Flex flex={1} justify="center" align="center" position="relative">
        {!isQuaternaryType && (
          <>
            <Flex
              position="absolute"
              opacity={0.5}
              width={132}
              height={132}
              borderRadius={132}
              backgroundColor={background.septenary}
            />
            <Flex
              width={102}
              height={102}
              borderRadius={102}
              backgroundColor={background.septenary}
            />
          </>
        )}
        <Flex justify="center" align="center" position="absolute" top={0} right={0} zIndex={2}>
          <FastImage
            style={{
              width: widthImage,
              height: heightImage,
            }}
            source={
              typeof image === 'string'
                ? {
                    uri: image,
                    priority: FastImage.priority.normal,
                  }
                : (image as Source)
            }
            resizeMode={FastImage.resizeMode.cover}
          />
        </Flex>
      </Flex>
    </TouchableOpacity>
  );
};

export default memo(PromoBanner);
