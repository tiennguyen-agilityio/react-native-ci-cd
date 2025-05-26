import {memo, useCallback, useMemo} from 'react';
import {Image, ScrollView, StyleSheet} from 'react-native';

// Interfaces
import {AppStackScreenProps, CarouselCard, DIRECTION, SCREENS} from '@/interfaces';

// Constants
import {PRODUCTS, REVIEWS} from '@/mocks';

// Themes
import {borderRadius, fontSizes, metrics} from '@/themes';

// Components
import {
  Button,
  Carousel,
  CartIcon,
  CartIconType,
  ChevronIcon,
  Collapse,
  ColorPicker,
  Divider,
  Flex,
  HeartIcon,
  Rating,
  SizeSelect,
  Text,
} from '@/components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useThemeStore} from '@/hooks';
import {CURRENCY_UNIT} from '@/constants';
import {ReviewSection} from './components';

type ProductDetailScreenProps = AppStackScreenProps<typeof SCREENS.PRODUCT_DETAIL>;

const ProductDetailScreen = ({navigation, route}: ProductDetailScreenProps) => {
  const insets = useSafeAreaInsets();
  const {
    theme: {text, background, fonts},
  } = useThemeStore();

  const {id = ''} = route?.params || {};

  const product = PRODUCTS.find(item => item.id === id);
  const {
    name,
    carouselImages,
    price,
    rating = 0,
    reviewCount,
    colors: colorsPrd = [],
    sizes: sizesPrd = [],
    description,
  } = product || {};
  const images = carouselImages?.map((url, index) => ({
    id: index.toString(),
    image: url,
  }));

  const styles = useMemo(
    () =>
      StyleSheet.create({
        iconBack: {
          width: 36,
          height: 36,
          borderRadius: 36,
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: text.primary,
          backgroundColor: background.default,
          shadowOffset: {width: 0, height: 3},
          shadowOpacity: 0.2,
          shadowRadius: 6,
          elevation: 4,
        },
        content: {
          flex: 1,
          paddingHorizontal: metrics.dimensions.xxl,
          zIndex: 3,
          marginTop: 10,
          paddingBottom: insets.bottom + 30,
          paddingTop: 57,
          backgroundColor: background.default,
          borderRadius: borderRadius.lg,
          shadowColor: text.primary,
          shadowOffset: {width: 0, height: 4},
          shadowOpacity: 0.5,
          shadowRadius: 6,
          elevation: 10,
        },
        price: {
          fontFamily: fonts.secondary?.medium || fonts.default.medium,
        },
        reviewCount: {
          fontSize: fontSizes.tiny,
          color: text.primary,
        },
      }),
    [text, background, fonts, insets],
  );

  const renderItemCarousel = useCallback(({image}: CarouselCard) => {
    const source = typeof image === 'string' ? {uri: image} : image;

    console.log('-----metrics.screenWidth', metrics.screenWidth);

    return <Image source={source} width={metrics.screenWidth} height={406} resizeMode="contain" />;
  }, []);

  const handleGoToBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleChangeFavorite = useCallback(() => {
    console.log('----handleChangeFavorite id', id);
  }, [id]);

  const handleChangeColor = useCallback((colors: string[]) => {
    console.log('---handleChangeColor', colors);
  }, []);

  const handleChangeSizes = useCallback((sizes: string[]) => {
    console.log('---handleChangSizes', sizes);
  }, []);

  const handleAddToCart = useCallback(() => {
    console.log('--- handle add to cart');
  }, []);

  return (
    <Flex flex={1} position="relative" backgroundColor={background.default}>
      <Flex
        direction="row"
        justify="between"
        height={44}
        top={insets.top}
        paddingHorizontal={metrics.dimensions.xxl}
        position="absolute"
        width="100%"
        zIndex={4}>
        <ChevronIcon direction={DIRECTION.LEFT} style={styles.iconBack} onPress={handleGoToBack} />
        <HeartIcon style={styles.iconBack} onPress={handleChangeFavorite} />
      </Flex>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Flex
          backgroundColor={background.default}
          position="relative"
          marginBottom={insets.bottom + 20}>
          <Carousel
            data={images}
            width={metrics.screenWidth}
            height={406}
            dotColor={text.default}
            renderItem={renderItemCarousel}
          />
          <Flex style={styles.content}>
            <Flex direction="row" justify="between">
              <Text variant="title" fontSize={fontSizes.base} color={text.primary}>
                {name}
              </Text>
              <Text variant="heading" style={styles.price}>
                {`${CURRENCY_UNIT} ${price}`}
              </Text>
            </Flex>
            <Flex direction="row" marginTop={17}>
              <Rating size={18} value={rating} />
              <Text style={styles.reviewCount}>{` (${reviewCount})`}</Text>
            </Flex>
            <Flex direction="row" justify="between" marginTop={36}>
              <ColorPicker
                colors={colorsPrd}
                defaultValue={[colorsPrd[0]]}
                onValueChange={handleChangeColor}
              />

              <SizeSelect
                sizes={sizesPrd}
                defaultValue={[sizesPrd[0]]}
                onValueChange={handleChangeSizes}
              />
            </Flex>
            <Flex marginTop={32}>
              <Divider />
              <Collapse label="Description">
                <Flex>
                  <Text>{description}</Text>
                </Flex>
              </Collapse>
            </Flex>
            <ReviewSection reviews={REVIEWS} rating={rating} />
          </Flex>
          <Flex
            position="absolute"
            zIndex={3}
            bottom={-insets.bottom}
            width="100%"
            height={insets.bottom + 30}
            backgroundColor={background.default}
          />
        </Flex>
      </ScrollView>
      <Button
        text="Add to cart"
        height={77}
        startIcon={<CartIcon type={CartIconType.Secondary} />}
        onPress={handleAddToCart}
      />
    </Flex>
  );
};

export default memo(ProductDetailScreen);
