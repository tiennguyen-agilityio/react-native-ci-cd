import {memo, useCallback} from 'react';
import {FlatList, ListRenderItemInfo} from 'react-native';

// Interfaces
import {Product} from '@/interfaces';

// Themes
import {metrics} from '@/themes';

// Components
import {Flex, ProductCard, ProductCardType} from '@/components';

interface ProductListProps {
  data: Product[];
  productCardType?: ProductCardType;
  horizontal?: boolean;
  onPressItem: (item: Product) => void;
  onLoadMore: () => void;
}

const ProductList = ({
  data,
  productCardType = ProductCardType.Primary,
  onPressItem,
  onLoadMore,
}: ProductListProps) => {
  const getKeyExtractor = useCallback(({id}: Product) => id, []);

  const renderItemProduct = useCallback(
    ({item}: ListRenderItemInfo<Product>) => {
      const isTertiaryType = productCardType === ProductCardType.Tertiary;

      const handleViewProductDetail = () => onPressItem(item);

      return (
        <ProductCard
          width={isTertiaryType ? 126 : 203}
          height={isTertiaryType ? 227 : 66}
          item={item}
          type={productCardType}
          onPress={handleViewProductDetail}
        />
      );
    },
    [onPressItem, productCardType],
  );

  const renderItemSeparatorComponent = useCallback(
    () => <Flex width={metrics.dimensions.lg} />,
    [],
  );
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
      ListFooterComponent={renderItemSpacingComponent}
      ListHeaderComponent={renderItemSpacingComponent}
    />
  );
};

export default memo(ProductList);
