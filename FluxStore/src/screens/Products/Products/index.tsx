import {memo, useCallback, useMemo} from 'react';
import {TouchableOpacity} from 'react-native';
import {FlashList} from '@shopify/flash-list';

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

  const {isTablet, width: screenWidth} = useMedia();
  const {theme} = useThemeStore();

  const {border} = theme;
  const numColumns = useMemo(() => {
    return isTablet ? 4 : 2;
  }, [isTablet]);

  const handleShowFilter = useCallback(() => {}, []);

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const {width, height} = useMemo(() => {
    const spacingPadding = 32;
    const spacingItem = metrics.dimensions.lg * (numColumns - 1);

    return {
      width: (screenWidth - (spacingPadding * 2 + spacingItem)) / numColumns,
      height: 273,
    };
  }, [numColumns, screenWidth]);

  const getKeyExtractor = useCallback(({id}: Product) => id, []);

  const handleViewProductDetail = useCallback((item: Product) => {
    navigation.navigate(SCREENS.PRODUCT_DETAIL, {id: item.id});
  }, []);

  const renderItemProduct = useCallback(
    ({item, index}: {item: Product; index: number}) => {
      const isLastColumn = (index + 1) % numColumns === 0;
      return (
        <Flex width={width} marginLeft={isLastColumn ? 'auto' : 0} overflow="hidden">
          <ProductCard
            key={item.id}
            width={width}
            height={height}
            item={item}
            isFavorite={favorites.includes(item.id)}
            type={ProductCardType.Primary}
            onPress={handleViewProductDetail}
          />
        </Flex>
      );
    },
    [width, height, favorites, numColumns, handleViewProductDetail],
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

  const renderListEmptyComponent = useCallback(
    () => (isLoading ? null : <Text>Product Empty</Text>),
    [isLoading],
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
              borderWidth={2}
              borderColor={border.default}>
              <Text>Filter</Text>
              <ArrowIcon direction={DIRECTION.DOWN} />
            </Flex>
          </TouchableOpacity>
        </Flex>

        <FlashList
          showsVerticalScrollIndicator={false}
          data={products}
          extraData={products}
          numColumns={numColumns}
          estimatedItemSize={height}
          ListFooterComponent={renderListFooterComponent}
          ListEmptyComponent={renderListEmptyComponent}
          keyExtractor={getKeyExtractor}
          renderItem={renderItemProduct}
          onEndReached={handleLoadMore}
        />
      </Flex>
    </MainLayout>
  );
};

export default memo(ProductsScreen);
