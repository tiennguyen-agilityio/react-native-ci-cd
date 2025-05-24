import {memo, useCallback, useMemo} from 'react';
import {FlatList, ListRenderItemInfo, StyleSheet, TouchableOpacity} from 'react-native';

// Constants
import {PRODUCTS} from '@/mocks';

// Interfaces
import {AppStackScreenProps, DIRECTION, Product, SCREENS} from '@/interfaces';

// Hooks
import {useMedia, useThemeStore} from '@/hooks';

// Themes
import {metrics} from '@/themes';

// Component
import {ArrowIcon, Flex, MainLayout, ProductCard, ProductCardType, Text} from '@/components';

const styles = StyleSheet.create({
  columnWrapperStyle: {
    gap: 30,
    marginBottom: 20,
  },
});

type LandingScreenProps = AppStackScreenProps<typeof SCREENS.HOME>;

const ProductsScreen = ({navigation, route}: LandingScreenProps) => {
  const {isTablet} = useMedia();
  const {theme} = useThemeStore();

  const {border} = theme;
  const numColumns = isTablet ? 4 : 2;

  const products = [...Array(50).keys()].map(value => ({
    ...PRODUCTS[0],
    id: value.toString(),
    isFavorite: value % 2 === 0,
  }));

  const favoritesProduct = useMemo(() => ['3', '4', '7', '10', '13'], []);

  const handleShowFilter = useCallback(() => {
    console.log('------Handle show filter: ');
  }, []);

  const handleLoadMoreProduct = useCallback(() => {
    console.log('------Load more Product: ');
  }, []);

  const {width, height} = useMemo(() => {
    const spacingPadding = 32;
    const spacingItem = 30 * (numColumns - 1);

    return {
      width: (metrics.screenWidth - (spacingPadding * 2 + spacingItem)) / numColumns,
      height: 273,
    };
  }, [numColumns]);

  const getKeyExtractor = useCallback(({id}: Product) => id, []);

  const getItemLayout = useCallback(
    (_item, index: number) => ({length: height, offset: height * index, index}),
    [height],
  );

  const renderItemProduct = useCallback(
    ({item}: ListRenderItemInfo<Product>) => {
      const handleViewProductDetail = () =>
        // navigation.navigate(SCREENS.PRODUCT_DETAIL, {product: item});
        console.log('navigation product detail');

      return (
        <ProductCard
          key={item.id}
          width={width}
          height={height}
          item={item}
          isFavorite={favoritesProduct.includes(item.id)}
          type={ProductCardType.Primary}
          onPress={handleViewProductDetail}
        />
      );
    },
    [width, height, favoritesProduct],
  );

  const renderItemSeparatorComponent = useCallback(
    () => <Flex width={metrics.dimensions.lg} backgroundColor="red" />,
    [],
  );

  return (
    <MainLayout>
      <Flex
        justify="start"
        marginTop={32}
        paddingHorizontal={metrics.dimensions.xxl}
        gap={metrics.dimensions.xl}>
        <Flex direction="row" justify="between">
          <Text variant="title">{`Found ${products?.length || 0} Results`}</Text>
          <TouchableOpacity activeOpacity={0.6} onPress={handleShowFilter}>
            <Flex
              direction="row"
              gap={11}
              justify="center"
              align="center"
              borderRadius={60}
              width={97}
              height={40}
              style={{borderWidth: 2, borderColor: border.default}}>
              <Text>Filter</Text>
              <ArrowIcon direction={DIRECTION.DOWN} />
            </Flex>
          </TouchableOpacity>
        </Flex>
        <FlatList
          data={products}
          key={numColumns}
          showsVerticalScrollIndicator={false}
          initialNumToRender={isTablet ? 12 : 6}
          numColumns={numColumns}
          onEndReached={handleLoadMoreProduct}
          keyExtractor={getKeyExtractor}
          renderItem={renderItemProduct}
          ItemSeparatorComponent={renderItemSeparatorComponent}
          getItemLayout={getItemLayout}
          columnWrapperStyle={styles.columnWrapperStyle}
          maxToRenderPerBatch={isTablet ? 24 : 10}
        />
      </Flex>
    </MainLayout>
  );
};

export default memo(ProductsScreen);
