import {memo} from 'react';
import {Image, ImageSourcePropType, StyleSheet} from 'react-native';
import Animated, {interpolate, SharedValue, useAnimatedStyle} from 'react-native-reanimated';

// Interfaces
import {Flex, Text} from '@/components';
import {borderRadius, colors} from '@/themes';

const styles = StyleSheet.create({
  image: {
    backgroundColor: colors.white[900],
    borderRadius: borderRadius.sm,
    width: '100%',
    height: 368,
    alignItems: 'center',
    marginTop: 30,
  },
});

interface CarouselItemProps {
  index: number;
  translateX: SharedValue<number>;
  title: string;
  description: string;
  image: ImageSourcePropType;
  width: number;
  widthImage?: number;
  heightImage?: number;
}

const CarouselItem = ({
  index,
  translateX,
  title,
  description,
  image,
  width,
  widthImage = 261,
  heightImage = 368,
}: CarouselItemProps) => {
  const animatedCardStyle = useAnimatedStyle(() => {
    const offset = translateX.value + index * width;
    const progress = Math.abs(offset) / width;
    const scale = interpolate(progress, [0, 1], [1, 0.75], 'clamp');

    return {
      transform: [{scale}],
    };
  });

  return (
    <Animated.View style={[{width}, animatedCardStyle]}>
      <Flex gap={17} align="center" paddingHorizontal={18}>
        <Text variant="title">{title}</Text>
        <Text>{description}</Text>
      </Flex>
      <Flex style={styles.image}>
        <Image source={image} width={widthImage} height={heightImage} />
      </Flex>
    </Animated.View>
  );
};

export default memo(CarouselItem);
