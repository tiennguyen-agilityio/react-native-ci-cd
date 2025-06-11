import {Platform, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {memo, useCallback, useMemo, useState} from 'react';
import FastImage, {Source} from 'react-native-fast-image';
// Constants
import {HOME_CAROUSELS, INIT_PAGE} from '@/constants';

// Interfaces
import {BottomTabsScreenProps, CarouselCard, Category, Product, SCREENS} from '@/interfaces';

// Hooks
import {useProducts, useScreenTrace} from '@/hooks';
import {useThemeStore} from '@/stores';
// Utils
import {getData} from '@/utils';

// Themes
import {metrics, fontSizes, Banners, borderRadius} from '@/themes';

// Component
import {
  Button,
  EyeglassesIcon,
  Flex,
  MainLayout,
  MenIcon,
  ProductCardType,
  PromoBanner,
  ScrewdriverIcon,
  Text,
  WomenIcon,
  PromoBannerType,
  ProductList,
  Carousel,
} from '@/components';
import {Categories} from './components';

const carouselWidth = metrics.screenWidth - 64;

const styles = StyleSheet.create({
  image: {
    width: carouselWidth,
    height: 168,
    borderRadius: borderRadius.md,
  },
});

const CATEGORIES: Category[] = [
  {
    id: '01',
    label: 'Women',
    key: 'women',
    Icon: WomenIcon,
  },
  {
    id: '02',
    label: 'Men',
    key: 'men',
    Icon: MenIcon,
  },
  {
    id: '03',
    label: 'Accessories',
    key: 'accessories',
    Icon: EyeglassesIcon,
  },
  {
    id: '04',
    label: 'Beauty',
    key: 'beauty',
    Icon: ScrewdriverIcon,
  },
];

const isAndroid = Platform.OS === 'android';

const HomeScreen = ({navigation}: BottomTabsScreenProps<typeof SCREENS.HOME>) => {
  useScreenTrace(SCREENS.HOME);
  const {theme} = useThemeStore();

  const {useFetchProducts} = useProducts();
  const {data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage} =
    useFetchProducts(INIT_PAGE);

  const pages = useMemo(() => data?.pages || [], [data?.pages]);
  const products = useMemo(
    () => (pages.length > 0 && getData<Product>(pages as never[])) || [],
    [pages],
  );

  const [categoryKey, setCategoryKey] = useState(CATEGORIES[0]);
  const {text} = theme;

  const handleChangeCategory = useCallback((value: Category) => {
    setCategoryKey(value);
  }, []);

  const handleShowAllProduct = useCallback(() => {
    navigation.push(SCREENS.PRODUCT_STACK, {
      screen: SCREENS.PRODUCTS,
    });
  }, [navigation]);

  const handlePressProduct = useCallback(
    ({id}: Product) => {
      navigation.push(SCREENS.PRODUCT_STACK, {
        screen: SCREENS.PRODUCT_DETAIL,
        params: {id},
      });
    },
    [navigation],
  );

  const handleLoadMoreProduct = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const handlePressCollection = useCallback(() => {}, []);

  const handlePressBeautyBanner = useCallback(() => {}, []);

  const handlePressShirtsBanner = useCallback(() => {}, []);

  const handlePressDressesBanner = useCallback(() => {}, []);

  const handleShowAllTopCollection = useCallback(() => {}, []);

  const renderItemCarousel = useCallback(
    ({image}: CarouselCard) => (
      <FastImage
        style={styles.image}
        source={image as Source}
        resizeMode={FastImage.resizeMode.cover}
      />
    ),
    [],
  );

  return (
    <MainLayout>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Flex justify="start" marginTop={32} paddingBottom={isAndroid ? 100 : 70}>
          <Flex justify="start" gap={20} paddingHorizontal={metrics.dimensions.xxl}>
            <Categories
              list={CATEGORIES}
              keyActivated={categoryKey.key}
              onChange={handleChangeCategory}
            />
            <Flex height={168} borderRadius={borderRadius.md} overflow="hidden">
              <Carousel
                data={HOME_CAROUSELS}
                width={carouselWidth}
                height={168}
                dotColor={text.light}
                renderItem={renderItemCarousel}
              />
            </Flex>
            <Flex
              direction="row"
              align="center"
              justify="between"
              marginBottom={metrics.dimensions.lg}>
              <Text variant="title">Feature Products</Text>
              <Button
                variant="ghost"
                text="Show all"
                color={text.senary}
                fontSize={fontSizes.xxs}
                onPress={handleShowAllProduct}
              />
            </Flex>
          </Flex>

          <Flex width="100%">
            <ProductList
              data={products}
              isLoading={isLoading || isFetchingNextPage}
              productCardType={ProductCardType.Tertiary}
              onPressItem={handlePressProduct}
              onLoadMore={handleLoadMoreProduct}
            />
          </Flex>

          <Flex marginTop={metrics.dimensions.lg} height={158}>
            <PromoBanner
              title={`HANG OUT \n& PARTY`}
              tag="|  NEW COLLECTION"
              image={Banners.collection}
              height={158}
              widthImage={119}
              heightImage={158}
              onPress={handlePressCollection}
            />
          </Flex>

          <Flex
            direction="row"
            align="center"
            justify="between"
            paddingHorizontal={metrics.dimensions.xxl}
            marginTop={30}
            marginBottom={25}>
            <Text variant="title">Recommended</Text>
            <Button
              variant="ghost"
              text="Show all"
              color={text.senary}
              fontSize={fontSizes.xxs}
              onPress={handleShowAllProduct}
            />
          </Flex>

          <Flex width="100%">
            <ProductList
              data={products}
              isLoading={isLoading || isFetchingNextPage}
              productCardType={ProductCardType.Secondary}
              onPressItem={handlePressProduct}
              onLoadMore={handleLoadMoreProduct}
            />
          </Flex>
          <Flex
            direction="row"
            align="center"
            justify="between"
            paddingHorizontal={metrics.dimensions.xxl}
            marginVertical={32}>
            <Text variant="title">Top Collection</Text>
            <Button
              variant="ghost"
              text="Show all"
              color={text.senary}
              fontSize={fontSizes.xxs}
              onPress={handleShowAllTopCollection}
            />
          </Flex>
          <Flex paddingHorizontal={metrics.dimensions.xxl} gap={metrics.dimensions.md}>
            <PromoBanner
              title={`FOR SLIM\n& BEAUTY`}
              tag="|  Sale up to 40%"
              image={Banners.beauty}
              height={141}
              widthImage={128}
              heightImage={141}
              type={PromoBannerType.Secondary}
              onPress={handlePressBeautyBanner}
            />
            <PromoBanner
              title={`Most sexy\n& fabulous\ndesign`}
              tag="|  Summer Collection 2025"
              image={Banners.fabulous}
              height={210}
              widthImage={128}
              heightImage={210}
              type={PromoBannerType.Tertiary}
              onPress={handlePressBeautyBanner}
            />
            <Flex direction="row" justify="between" gap={10}>
              <PromoBanner
                title={`The\nOffice\nLife`}
                tag="T-Shirts"
                image={Banners.shirts}
                height={194}
                widthImage={110}
                heightImage={194}
                isReversed
                type={PromoBannerType.Quaternary}
                onPress={handlePressShirtsBanner}
              />
              <PromoBanner
                title={`Elegant\nDesign`}
                tag="Dresses"
                image={Banners.dresses}
                height={194}
                widthImage={110}
                heightImage={194}
                type={PromoBannerType.Quaternary}
                onPress={handlePressDressesBanner}
              />
            </Flex>
          </Flex>
        </Flex>
      </ScrollView>
    </MainLayout>
  );
};

export default memo(HomeScreen);
