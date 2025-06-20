import {memo, useCallback, useMemo} from 'react';
import isEqual from 'react-fast-compare';
import {FlashList} from '@shopify/flash-list';

// Interfaces
import {Product} from '@/interfaces';

// Themes
import {metrics} from '@/themes';

// Components
import {Flex, ProductCard, ProductCardType, Skeleton} from '@/components';

interface ProductListProps {
  data: Product[];
  productCardType?: ProductCardType;
  isLoading?: boolean;
  itemSpacing?: number;
  onPressItem: (item: Product) => void;
  onLoadMore: () => void;
}

const ProductList = ({
  data,
  productCardType = ProductCardType.Primary,
  isLoading = false,
  itemSpacing = metrics.dimensions.lg,
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
    ({item, index}: {item: Product; index: number}) => {
      return (
        <Flex marginLeft={index === 0 ? 0 : itemSpacing}>
          <ProductCard
            {...cardDimensions}
            item={item}
            type={productCardType}
            onPress={onPressItem}
          />
        </Flex>
      );
    },
    [cardDimensions, productCardType, itemSpacing, onPressItem],
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
    <FlashList
      data={data}
      extraData={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      estimatedItemSize={cardDimensions.width}
      ListHeaderComponent={renderItemSpacingComponent}
      ListFooterComponent={renderListFooterComponent}
      keyExtractor={getKeyExtractor}
      renderItem={renderItemProduct}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.1}
    />
  );
};

export default memo(ProductList, isEqual);
