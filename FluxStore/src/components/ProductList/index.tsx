import {memo, useCallback, useMemo} from 'react';
import {FlatList, ListRenderItemInfo} from 'react-native';
import isEqual from 'react-fast-compare';

// Interfaces
import {Product} from '@/interfaces';

// Themes
import {metrics} from '@/themes';

// Components
import {Flex, ProductCard, ProductCardType, Skeleton} from '@/components';

interface ProductListProps {
  data: Product[];
  productCardType?: ProductCardType;
  horizontal?: boolean;
  isLoading?: boolean;
  onPressItem: (item: Product) => void;
  onLoadMore: () => void;
}

const ProductList = ({
  data,
  productCardType = ProductCardType.Primary,
  isLoading = false,
  onPressItem,
  onLoadMore,
}: ProductListProps) => {
  const getKeyExtractor = useCallback(({id}: Product) => id, []);

  const isTertiary = productCardType === ProductCardType.Tertiary;

  const cardDimensions = useMemo(
    () => ({
      width: isTertiary ? 126 : 203,
      height: isTertiary ? 227 : 66,
    }),
    [isTertiary],
  );

  const renderItemProduct = useCallback(
    ({item}: ListRenderItemInfo<Product>) => (
      <ProductCard
        width={cardDimensions.width}
        height={cardDimensions.height}
        item={item}
        type={productCardType}
        onPress={() => onPressItem(item)}
      />
    ),
    [cardDimensions, productCardType, onPressItem],
  );

  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: cardDimensions.width,
      offset: cardDimensions.width * index,
      index,
    }),
    [cardDimensions.width],
  );

  const renderItemSeparatorComponent = useCallback(
    () => <Flex width={metrics.dimensions.lg} />,
    [],
  );

  const renderListFooterComponent = useMemo(() => {
    if (isLoading) {
      return (
        <Flex
          direction="row"
          gap={metrics.dimensions.xl}
          paddingHorizontal={data?.length ? metrics.dimensions.xl : 0}
          height={cardDimensions.height}>
          {[...Array(data?.length ? 1 : 3).keys()].map(item => (
            <Skeleton key={item} width={cardDimensions.width} height={cardDimensions.height} />
          ))}
        </Flex>
      );
    }

    return <Flex width={metrics.dimensions.xxl} height={cardDimensions.height} />;
  }, [isLoading, cardDimensions.height, cardDimensions.width, data?.length]);

  const renderItemSpacingComponent = useCallback(() => <Flex width={metrics.dimensions.xxl} />, []);

  return (
    <FlatList
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      onEndReached={onLoadMore}
      keyExtractor={getKeyExtractor}
      renderItem={renderItemProduct}
      ItemSeparatorComponent={renderItemSeparatorComponent}
      ListHeaderComponent={renderItemSpacingComponent}
      ListFooterComponent={renderListFooterComponent}
      getItemLayout={getItemLayout}
      initialNumToRender={8}
      maxToRenderPerBatch={8}
      updateCellsBatchingPeriod={50}
      windowSize={8}
      removeClippedSubviews
    />
  );
};

export default memo(ProductList, isEqual);
