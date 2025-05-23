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
  onLoadMore: () => void;
}

const ProductList = ({data, onLoadMore}: ProductListProps) => {
  const navigation = useNavigation();

  const getKeyExtractor = useCallback(({id}: Product) => id, []);

  const renderItemProduct = useCallback(({item}: ListRenderItemInfo<Product>) => {
    const handleViewProductDetail = () =>
      // navigation.navigate(SCREENS.PRODUCT_DETAIL, {product: item});
      console.log('navigation product detail');

    return (
      <ProductCard
        width={126}
        height={227}
        widthImage={126}
        heightImage={172}
        item={item}
        type={ProductCardType.Tertiary}
        onPress={handleViewProductDetail}
      />
    );
  }, []);

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
