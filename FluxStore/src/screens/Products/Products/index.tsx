import {memo, useCallback, useMemo} from 'react';
import {FlatList, ListRenderItemInfo, StyleSheet, TouchableOpacity} from 'react-native';

// Constants
import {INIT_PAGE} from '@/constants';

// Interfaces
import {DIRECTION, Product, ProductScreenProps, SCREENS} from '@/interfaces';

// Hooks | Stores
import {useMedia, useProducts, useScreenTrace} from '@/hooks';
import {useAuthStore, useThemeStore} from '@/stores';

// Themes
import {metrics} from '@/themes';

// Utils
import {getData} from '@/utils';

// Component
import {
  ArrowIcon,
  Flex,
  MainLayout,
  ProductCard,
  ProductCardType,
  Skeleton,
  Text,
} from '@/components';

const styles = StyleSheet.create({
  columnWrapperStyle: {
    gap: 30,
    marginBottom: 20,
  },
});

const ProductsScreen = ({navigation}: ProductScreenProps<typeof SCREENS.PRODUCTS>) => {
  useScreenTrace(SCREENS.PRODUCTS);

  const user = useAuthStore(state => state.user);
  const {favorites = []} = user || {};
  const {useFetchProducts} = useProducts();
  const {data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage} =
    useFetchProducts(INIT_PAGE);

  const pages = useMemo(() => data?.pages || [], [data?.pages]);
  const products = useMemo(
    () => (pages.length > 0 && getData<Product>(pages as never[])) || [],
    [pages],
  );

  const {isTablet, width: screenWidth, isPortrait} = useMedia();
  const {theme} = useThemeStore();

  const {border} = theme;
  const numColumns = useMemo(() => {
    if (isTablet) {
      return isPortrait ? 3 : 4;
    }

    return 2;
  }, [isTablet, isPortrait]);

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
      width: (screenWidth - (spacingPadding * 2 + spacingItem)) / numColumns,
      height: 273,
    };
  }, [numColumns, screenWidth]);

  const getKeyExtractor = useCallback(({id}: Product) => id, []);

  const getItemLayout = useCallback(
    (_, index: number) => ({length: height, offset: height * index, index}),
    [height],
  );

  const renderItemProduct = useCallback(
    ({item}: ListRenderItemInfo<Product>) => {
      const handleViewProductDetail = () =>
        navigation.navigate(SCREENS.PRODUCT_DETAIL, {id: item.id});

      return (
        <ProductCard
          key={item.id}
          width={width}
          height={height}
          item={item}
          isFavorite={favorites.includes(item.id)}
          type={ProductCardType.Primary}
          onPress={handleViewProductDetail}
        />
      );
    },
    [width, height, favorites, navigation],
  );

  const renderItemSeparatorComponent = useCallback(
    () => <Flex width={metrics.dimensions.lg} />,
    [],
  );

  const renderListFooterComponent = useMemo(() => {
    if (isFetchingNextPage || isLoading) {
      return (
        <Flex direction="row" wrap="wrap" justify="between" height={height}>
          <Skeleton width={width} height={height} />
          <Skeleton width={width} height={height} />
        </Flex>
      );
    }
    return null;
  }, [isLoading, isFetchingNextPage, height, width]);

  const renderListEmptyComponent = useCallback(() => <Text>Product Empty</Text>, []);

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
              borderWidth={2}
              borderColor={border.default}>
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
          ListEmptyComponent={renderListEmptyComponent}
          ListFooterComponent={renderListFooterComponent}
          getItemLayout={getItemLayout}
          columnWrapperStyle={styles.columnWrapperStyle}
          maxToRenderPerBatch={isTablet ? 24 : 10}
          updateCellsBatchingPeriod={50}
          windowSize={8}
          removeClippedSubviews={true}
        />
      </Flex>
    </MainLayout>
  );
};

export default memo(ProductsScreen);
