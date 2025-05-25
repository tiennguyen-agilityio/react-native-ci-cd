import {memo, ReactNode, useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';

// Constants
import {HOME_CAROUSELS} from '@/constants';

// Components
import {Flex} from '@/components';
import DotsCarousel from './DotsCarousel';

//Themes
import {CarouselCard} from '@/interfaces';
import CarouselItem from './CarouselItem';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  track: {
    flexDirection: 'row',
  },
});

interface CarouselProps {
  data?: CarouselCard[];
  width: number;
  height: number;
  dotColor?: string;
  renderItem: (item: CarouselCard, index: number) => ReactNode;
}

const Carousel = ({data = HOME_CAROUSELS, width, height, dotColor, renderItem}: CarouselProps) => {
  const translateX = useSharedValue(0);
  const currentIndex = useSharedValue(0);
  const scale = useSharedValue(1);

  const lengthCarousel = data.length;
  const maxWidth = (lengthCarousel - 1) * -width;

  const panGesture = Gesture.Pan()
    .onUpdate(event => {
      const currentValue = event.translationX + currentIndex.value * -width;

      if (!currentIndex.value && currentValue > 0) {
        translateX.value = 0;
      } else if (currentIndex.value === lengthCarousel - 1 && currentValue < maxWidth) {
        translateX.value = maxWidth;
      } else {
        translateX.value = currentValue;
      }
      scale.value = withTiming(1.3, {duration: 200});
    })
    .onEnd(() => {
      let predictedIndex = Math.round(translateX.value / -width);

      if (predictedIndex < 0) {
        predictedIndex = 0;
      } else if (predictedIndex > lengthCarousel - 1) {
        predictedIndex = lengthCarousel - 1;
      }
      currentIndex.value = predictedIndex;
      translateX.value = withTiming(predictedIndex * -width, {duration: 200});
      scale.value = withTiming(1, {duration: 200});
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
  }));

  const handleChangeDot = useCallback(
    (index: number) => {
      currentIndex.value = index;
      translateX.value = withTiming(index * -width, {duration: 200});
      scale.value = withTiming(1.2, {duration: 200});
    },
    [currentIndex, translateX, width, scale],
  );

  return (
    <Flex height={height} width={width} direction="row" position="relative" overflow="hidden">
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.track, {width, height}, animatedStyle]}>
          {data.map((item, index) => (
            <CarouselItem
              key={index}
              index={index}
              translateX={translateX}
              width={width}
              height={height}>
              {renderItem(item, index)}
            </CarouselItem>
          ))}
        </Animated.View>
      </GestureDetector>
      <Flex position="absolute" bottom={8.5} width="100%" align="center">
        <DotsCarousel
          length={HOME_CAROUSELS.length}
          currentIndex={currentIndex}
          color={dotColor}
          onDotPress={handleChangeDot}
        />
      </Flex>
    </Flex>
  );
};

export default memo(Carousel);
