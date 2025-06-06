import {memo, useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';

// Constants
import {CAROUSELS} from '@/constants';

// Components
import {Flex} from '@/components';
import DotsCarousel from './DotsCarousel';
import CarouselItem from './CarouselItem';

//Themes
import {metrics} from '@/themes';

const CARD_WIDTH = metrics.screenWidth - 108;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  track: {
    flexDirection: 'row',
    width: CARD_WIDTH,
  },
});

const Carousel = () => {
  const translateX = useSharedValue(0);
  const currentIndex = useSharedValue(0);
  const scale = useSharedValue(1);

  const lengthCarousel = CAROUSELS.length;
  const maxWidth = (lengthCarousel - 1) * -CARD_WIDTH;

  const panGesture = Gesture.Pan()
    .onUpdate(event => {
      const currentValue = event.translationX + currentIndex.value * -CARD_WIDTH;

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
      let predictedIndex = Math.round(translateX.value / -CARD_WIDTH);

      if (predictedIndex < 0) {
        predictedIndex = 0;
      } else if (predictedIndex > lengthCarousel - 1) {
        predictedIndex = lengthCarousel - 1;
      }
      currentIndex.value = predictedIndex;
      translateX.value = withTiming(predictedIndex * -CARD_WIDTH, {duration: 200});
      scale.value = withTiming(1, {duration: 200});
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
  }));

  const handleChangeDot = useCallback(
    (index: number) => {
      currentIndex.value = index;
      translateX.value = withTiming(index * -CARD_WIDTH, {duration: 200});
      scale.value = withTiming(1.2, {duration: 200});
    },
    [currentIndex, translateX, scale],
  );

  return (
    <Flex>
      <Flex flex={1} direction="row">
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.track, animatedStyle]}>
            {CAROUSELS.map(({id, title, description, image}, index) => (
              <CarouselItem
                key={id}
                index={index}
                translateX={translateX}
                title={title}
                description={description}
                image={image}
                width={CARD_WIDTH}
              />
            ))}
          </Animated.View>
        </GestureDetector>
      </Flex>
      <Flex marginTop={57}>
        <DotsCarousel
          length={CAROUSELS.length}
          currentIndex={currentIndex}
          onDotPress={handleChangeDot}
        />
      </Flex>
    </Flex>
  );
};

export default memo(Carousel);
