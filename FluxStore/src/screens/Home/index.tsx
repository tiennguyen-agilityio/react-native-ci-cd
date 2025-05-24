import {ScrollView} from 'react-native-gesture-handler';
import {memo, useCallback, useState} from 'react';

// Constants
import {PRODUCTS} from '@/mocks';

// Interfaces
import {AppStackScreenProps, Category, SCREENS} from '@/interfaces';

// Hooks
import {useThemeStore} from '@/hooks';

// Themes
import {metrics, fontSizes, Banners} from '@/themes';

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
} from '@/components';
import {Carousel, Categories} from './components';

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

type LandingScreenProps = AppStackScreenProps<typeof SCREENS.HOME>;

const Home = ({navigation, route}: LandingScreenProps) => {
  const {toggleTheme, theme} = useThemeStore();
  const {text} = theme;
  const [categoryKey, setCategoryKey] = useState(CATEGORIES[0]);

  const products = [...Array(50).keys()].map(value => ({
    ...PRODUCTS[0],
    id: value.toString(),
  }));

  const handleChangeCategory = useCallback((value: Category) => {
    console.log('------Change category: ', value);
    setCategoryKey(value);
  }, []);

  const handleShowAllProduct = useCallback(() => {
    console.log('-----navigation  show all Product');
  }, []);

  const handleLoadMoreProduct = useCallback(() => {
    console.log('-----Load more product');
  }, []);

  const handlePressCollection = useCallback(() => {
    console.log('--Press Collection banner');
  }, []);

  const handlePressBeautyBanner = useCallback(() => {
    console.log('--Press Beauty banner');
  }, []);

  const handlePressShirtsBanner = useCallback(() => {
    console.log('--Press T-Shirts banner');
  }, []);

  const handlePressDressesBanner = useCallback(() => {
    console.log('--Press Dresses banner');
  }, []);

  const handleShowAllProductRecommend = useCallback(() => {
    console.log('--Press Show all Recommend');
  }, []);

  const handleShowAllTopCollection = useCallback(() => {
    console.log('--Press Show all Top Collection');
  }, []);

  return (
    <MainLayout route={route}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Flex justify="start" marginTop={32} paddingBottom={metrics.dimensions.xxl}>
          <Flex justify="start" gap={20} paddingHorizontal={metrics.dimensions.xxl}>
            <Categories
              list={CATEGORIES}
              keyActivated={categoryKey.key}
              onChange={handleChangeCategory}
            />
            <Flex height={168}>
              <Carousel />
            </Flex>
            <Flex direction="row" align="center" justify="between">
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
          <ProductList
            data={products}
            productCardType={ProductCardType.Tertiary}
            onLoadMore={handleLoadMoreProduct}
          />

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
              onPress={handleShowAllProductRecommend}
            />
          </Flex>
          <ProductList
            data={products}
            productCardType={ProductCardType.Secondary}
            onLoadMore={handleLoadMoreProduct}
          />
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

export default memo(Home);
