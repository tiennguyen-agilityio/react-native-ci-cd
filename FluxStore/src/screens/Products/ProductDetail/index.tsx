import {memo, useCallback, useEffect, useMemo, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import Toast from 'react-native-toast-message';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';

// Interfaces
import {CarouselCard, DIRECTION, ProductScreenProps, SCREENS} from '@/interfaces';

// Constants
import {REVIEWS} from '@/mocks';
import {CURRENCY_UNIT} from '@/constants';

// Hooks | Stores
import {useCartStore, useThemeStore, useAuthStore} from '@/stores';
import {useProducts, useScreenTrace} from '@/hooks';

// Utils
import {customTrace, formatAmount} from '@/utils';

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
  Skeleton,
  Text,
} from '@/components';
import {ReviewSection} from './components';

const ProductDetailScreen = ({
  navigation,
  route,
}: ProductScreenProps<typeof SCREENS.PRODUCT_DETAIL>) => {
  useScreenTrace(SCREENS.PRODUCT_DETAIL);

  const insets = useSafeAreaInsets();
  const {
    theme: {text, background, fonts},
  } = useThemeStore();
  const {id = ''} = route.params || {};

  const {useProductDetail} = useProducts();
  const {data: product, isLoading, isFetched} = useProductDetail(id);

  const addNewCart = useCartStore(state => state.addNewCart);
  const user = useAuthStore(state => state.user);

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

  const [color, setColor] = useState(colorsPrd[0]);
  const [size, setSize] = useState(sizesPrd[0]);

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
          paddingBottom: 40,
          paddingTop: 57,
          backgroundColor: background.default,
          borderTopLeftRadius: borderRadius.lg,
          borderTopRightRadius: borderRadius.lg,
          shadowColor: text.primary,
          shadowOffset: {width: 0, height: 4},
          shadowOpacity: 0.5,
          shadowRadius: 6,
          elevation: 6,
        },
        image: {
          width: metrics.screenWidth,
          height: 406,
          backgroundColor: background.tertiary,
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
        button: {
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        },
      }),
    [text, background, fonts],
  );

  const renderItemCarousel = useCallback(
    ({image}: CarouselCard) => (
      <FastImage
        style={styles.image}
        source={{
          uri: image,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
    ),
    [styles.image],
  );

  const handleGoToBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleChangeFavorite = useCallback(() => {}, []);

  const handleChangeColor = useCallback((value: string) => {
    setColor(value);
  }, []);

  const handleChangeSizes = useCallback((value: string) => {
    setSize(value);
  }, []);

  const handleAddToCart = useCallback(async () => {
    const {trace, traceStop} = await customTrace(SCREENS.PRODUCT_DETAIL);
    if (product) {
      addNewCart({
        id: product.id,
        product,
        colors: color,
        sizes: size,
        quantity: 1,
        isChecked: true,
      });
      Toast.show({
        type: 'success',
        text1: 'Added to cart',
      });
      trace.putAttribute('Added to cart', 'success');
      await traceStop();
      navigation.navigate(SCREENS.CART_STACK, {
        screen: SCREENS.CART,
      });
    }
  }, [product, color, size]);

  useEffect(() => {
    if (isFetched) {
      setColor(colorsPrd[0]);
      setSize(sizesPrd[0]);
    }
  }, [isFetched]);

  return (
    <Flex flex={1} position="relative" backgroundColor={background.default} paddingBottom={77}>
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
          {isLoading ? (
            <Skeleton width={metrics.screenWidth} height={406} />
          ) : (
            <Carousel
              data={images}
              width={metrics.screenWidth}
              height={406}
              dotColor={text.default}
              renderItem={renderItemCarousel}
            />
          )}
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
                {!!promoPrice && (
                  <Text style={styles.originalPrice}>{`${CURRENCY_UNIT} ${originalPrice}`}</Text>
                )}
              </Flex>
            </Flex>
            <Flex direction="row" justify="between" marginTop={36}>
              <ColorPicker
                colors={colorsPrd}
                defaultValue={color}
                onValueChange={handleChangeColor}
              />
              <SizeSelect sizes={sizesPrd} defaultValue={size} onValueChange={handleChangeSizes} />
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
            <Flex
              position="absolute"
              bottom={-40}
              width={metrics.screenWidth}
              height={40}
              backgroundColor={background.default}
            />
          </Flex>
        </Flex>
      </ScrollView>
      <Flex position="absolute" width="100%" height={77} bottom={0}>
        <Button
          text="Add to cart"
          height={77}
          style={styles.button}
          startIcon={<CartIcon type={CartIconType.Secondary} />}
          onPress={handleAddToCart}
        />
      </Flex>
    </Flex>
  );
};

export default memo(ProductDetailScreen);
