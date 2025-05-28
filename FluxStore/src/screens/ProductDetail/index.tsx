import {memo, useCallback, useMemo} from 'react';
import {Image, ScrollView, StyleSheet} from 'react-native';

// Interfaces
import {AppStackScreenProps, CarouselCard, DIRECTION, SCREENS} from '@/interfaces';

// Constants
import {REVIEWS} from '@/mocks';

// Themes
import {borderRadius, fontSizes, fontWeights, metrics} from '@/themes';

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
import {useProducts, useThemeStore} from '@/hooks';
import {CURRENCY_UNIT} from '@/constants';
import {ReviewSection} from './components';
import {formatAmount} from '@/utils';

type ProductDetailScreenProps = AppStackScreenProps<typeof SCREENS.PRODUCT_DETAIL>;

const ProductDetailScreen = ({navigation, route}: ProductDetailScreenProps) => {
  const insets = useSafeAreaInsets();
  const {
    theme: {text, background, fonts},
  } = useThemeStore();
  const {id = ''} = route?.params || {};

  const {useProductDetail} = useProducts();
  const {data: product} = useProductDetail(id);

  const {
    name,
    carouselImages,
    price = 0,
    discount,
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

  const {originalPrice, promoPrice} = useMemo(
    () => ({
      promoPrice: discount ? formatAmount((price * discount) / 100) : 0,
      originalPrice: formatAmount(price),
    }),
    [price, discount],
  );

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
          borderTopLeftRadius: borderRadius.lg,
          borderTopRightRadius: borderRadius.lg,
          shadowColor: text.primary,
          shadowOffset: {width: 0, height: 4},
          shadowOpacity: 0.5,
          shadowRadius: 6,
          elevation: 10,
        },
        price: {
          fontFamily: fonts.secondary?.medium || fonts.default.medium,
        },
        originalPrice: {
          fontWeight: fontWeights.regular,
          color: text.septenary,
          textDecorationLine: 'line-through',
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
    return <Image source={source} width={metrics.screenWidth} height={406} resizeMode="contain" />;
  }, []);

  const handleGoToBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleChangeFavorite = useCallback(() => {}, []);

  const handleChangeColor = useCallback((color: string) => {}, []);

  const handleChangeSizes = useCallback((size: string) => {}, []);

  const handleAddToCart = useCallback(() => {}, []);

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
              <Flex>
                <Text variant="title" fontSize={fontSizes.base} color={text.primary}>
                  {name}
                </Text>
                <Flex direction="row" marginTop={17}>
                  <Rating size={18} value={rating} />
                  <Text style={styles.reviewCount}>{` (${reviewCount})`}</Text>
                </Flex>
              </Flex>
              <Flex align="end">
                <Text variant="heading" style={styles.price}>
                  {`${CURRENCY_UNIT} ${promoPrice || originalPrice}`}
                </Text>
                {promoPrice && (
                  <Text style={styles.originalPrice}>{`${CURRENCY_UNIT} ${originalPrice}`}</Text>
                )}
              </Flex>
            </Flex>
            <Flex direction="row" justify="between" marginTop={36}>
              <ColorPicker
                colors={colorsPrd}
                defaultValue={colorsPrd[0]}
                onValueChange={handleChangeColor}
              />
              <SizeSelect
                sizes={sizesPrd}
                defaultValue={sizesPrd[0]}
                onValueChange={handleChangeSizes}
              />
            </Flex>
            <Flex marginTop={32}>
              <Divider />
              <Collapse label="Description">
                <Flex width="100%">
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
