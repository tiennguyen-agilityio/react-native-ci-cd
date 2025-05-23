import {memo} from 'react';
import {Image, ImageSourcePropType, StyleSheet} from 'react-native';
import Animated, {interpolate, SharedValue, useAnimatedStyle} from 'react-native-reanimated';

// Interfaces
import {Flex, Text} from '@/components';
import {borderRadius, colors, fontSizes} from '@/themes';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    position: 'relative',
    borderRadius: borderRadius.md,
    overflow: 'hidden',
  },
  image: {
    backgroundColor: colors.white[900],
    borderRadius: borderRadius.sm,
    width: '100%',
    height: 168,
    alignItems: 'center',
  },
});

interface CarouselItemProps {
  index: number;
  translateX: SharedValue<number>;
  title: string;
  image: ImageSourcePropType;
  width: number;
  widthImage?: number;
  heightImage?: number;
  isScaled?: boolean;
}

const CarouselItem = ({
  index,
  translateX,
  title,
  image,
  width,
  widthImage = width,
  heightImage = 168,
  isScaled = false,
}: CarouselItemProps) => {
  const animatedCardStyle = useAnimatedStyle(() => {
    const offset = translateX.value + index * width;
    const progress = Math.abs(offset) / width;
    const scale = interpolate(progress, [0, 1], [1, 0.75], 'clamp');

    return {
      ...(isScaled && {
        transform: [isScaled ? {scale} : {}],
      }),
    };
  });

  return (
    <Animated.View style={[{width}, animatedCardStyle]}>
      <Flex
        direction="row"
        position="relative"
        width={widthImage}
        height={heightImage}
        style={styles.wrapper}>
        <Image source={image} style={styles.image} />
        <Flex position="absolute" width={116} top={20} right={8}>
          <Text variant="heading" fontSize={fontSizes.md} color={colors.white[500]}>
            {title}
          </Text>
        </Flex>
      </Flex>
    </Animated.View>
  );
};

export default memo(CarouselItem);
