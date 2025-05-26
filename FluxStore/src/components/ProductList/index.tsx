import {memo, useCallback} from 'react';
import {FlatList, ListRenderItemInfo} from 'react-native';
import {useNavigation} from '@react-navigation/native';

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
  onLoadMore: () => void;
}

const ProductList = ({
  data,
  productCardType = ProductCardType.Primary,
  onLoadMore,
}: ProductListProps) => {
  const navigation = useNavigation();

  const getKeyExtractor = useCallback(({id}: Product) => id, []);

  const renderItemProduct = useCallback(
    ({item}: ListRenderItemInfo<Product>) => {
      const isTertiaryType = productCardType === ProductCardType.Tertiary;

      const handleViewProductDetail = () =>
        // navigation.navigate(SCREENS.PRODUCT_DETAIL, {product: item});
        console.log('navigation product detail');

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
    [productCardType],
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
