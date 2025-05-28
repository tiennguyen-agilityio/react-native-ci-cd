import {memo, useCallback, useMemo} from 'react';
import {FlatList, ListRenderItemInfo, StyleSheet, TouchableOpacity} from 'react-native';

// Constants
import {INIT_PAGE} from '@/constants';

// Interfaces
import {AppStackScreenProps, DIRECTION, Product, SCREENS} from '@/interfaces';

// Hooks
import {useMedia, useProducts, useThemeStore} from '@/hooks';

// Themes
import {metrics} from '@/themes';

// Utils
import {getData} from '@/utils';

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
  const {useFetchProducts} = useProducts();
  const {data, fetchNextPage, hasNextPage, isFetchingNextPage} = useFetchProducts(INIT_PAGE);

  const pages = useMemo(() => data?.pages || [], [data?.pages]);
  const products = useMemo(
    () => (pages.length > 0 && getData<Product>(pages as never[])) || [],
    [pages],
  );

  const {isTablet} = useMedia();
  const {theme} = useThemeStore();

  const {border} = theme;
  const numColumns = useMemo(() => (isTablet ? 4 : 2), [isTablet]);

  const favoritesProduct = useMemo(() => ['3', '4', '7', '10', '13'], []);

  const handleShowFilter = useCallback(() => {}, []);

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

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
        flex={1}
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
          onEndReached={handleLoadMore}
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
