import {ScrollView} from 'react-native-gesture-handler';
import {memo, useCallback, useState} from 'react';

// Constants
import {PRODUCTS} from '@/mocks';

// Interfaces
import {AppStackScreenProps, Category, SCREENS} from '@/interfaces';

// Hooks
import {useThemeStore} from '@/hooks';

// Themes
import {metrics, Banners, fontSizes} from '@/themes';

// Component
import {
  Button,
  EyeglassesIcon,
  Flex,
  MainLayout,
  MenIcon,
  PromoBanner,
  ScrewdriverIcon,
  Text,
  WomenIcon,
} from '@/components';
import {Carousel, Categories, ProductList} from './components';

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

  return (
    <MainLayout route={route}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Flex justify="start" marginTop={32}>
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
          <ProductList data={products} onLoadMore={handleLoadMoreProduct} />

          <Flex marginTop={metrics.dimensions.lg} height={158}>
            <PromoBanner
              title={`HANG OUT \n& PARTY`}
              tag="|  NEW COLLECTION"
              image={Banners.colection}
              height={158}
              widthImage={119}
              heightImage={158}
              onPress={handlePressCollection}
            />
          </Flex>
        </Flex>
      </ScrollView>
    </MainLayout>
  );
};

export default memo(Home);
