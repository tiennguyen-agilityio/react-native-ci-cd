import {memo, useCallback, useMemo} from 'react';
import {DimensionValue, Image, StyleSheet, TouchableOpacity} from 'react-native';

import {Product} from '@/interfaces';
import {CURRENCY_UNIT} from '@/constants';
import {useThemeStore} from '@/hooks';
import {formatAmount} from '@/utils';
import {borderRadius, colors, fontSizes, fontWeights} from '@/themes';

import {HeartIcon} from '../Icons';
import Text from '../Text';
import Rating from '../Rating';
import Flex from '../Flex';

export enum ProductCardType {
  Primary = 'primary',
  Secondary = 'secondary',
  Tertiary = 'tertiary',
}

export interface ProductCardProps {
  item: Product;
  isFavorite?: boolean;
  width?: DimensionValue;
  height?: DimensionValue;
  type?: ProductCardType;
  onPress?: (item: Product) => void;
}

const ProductCard = ({
  item,
  isFavorite = false,
  width = '100%',
  height = '100%',
  type = ProductCardType.Primary,
  onPress,
}: ProductCardProps) => {
  const {isDark, theme} = useThemeStore();

  const {image, name, price, discount, rating, reviewCount} = item;
  const isSecondaryType = type === ProductCardType.Secondary;
  const isPrimaryType = type === ProductCardType.Primary;
  const isPTertiaryType = type === ProductCardType.Tertiary;

  const imageSize = useMemo(() => {
    switch (type) {
      case ProductCardType.Secondary: {
        return {
          width: 66,
          height: height,
        };
      }

      case ProductCardType.Tertiary: {
        return {
          width: width,
          height: 172,
        };
      }

      case ProductCardType.Primary:
      default: {
        return {
          width: width,
          height: 186,
        };
      }
    }
  }, [type, height, width]);

  const themeStyles = useMemo(
    () =>
      StyleSheet.create({
        wrapper: {
          backgroundColor: theme.background.default,
          gap: 10,
          width,
          height,
          ...(isSecondaryType && {
            flexDirection: 'row',
            gap: 8,
          }),
          ...(isSecondaryType && {
            shadowColor: isDark ? colors.transparent : colors.black[500],
            borderColor: theme.border.secondary,
            borderWidth: 1,
            shadowOffset: {width: 0, height: 1},
            shadowOpacity: 0.05,
            shadowRadius: 1,
            borderRadius: 8,
            elevation: 1.2,
          }),
        },
        icon: {
          width: 27,
          height: 27,
          borderRadius: '50%',
          position: 'absolute',
          top: 10,
          right: 10,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.background.icon,
        },
        image: {
          width: imageSize.width || 141,
          height: imageSize.height || 'auto',
          borderRadius: isSecondaryType || isPTertiaryType ? borderRadius.xs : borderRadius.sm,
          position: 'relative',
          overflow: 'hidden',
        },
        name: {
          fontSize: fontSizes.tiny,
          fontWeight: fontWeights.semiBold,
          fontFamily: theme.fonts?.primary?.medium || theme.fonts.default.medium,
          color: theme.text.primary,
        },
        price: {
          flexDirection: 'row',
          marginTop: isSecondaryType ? 8 : 10,
        },
        promoPrice: {
          fontSize: fontSizes.sm,
          fontWeight: fontWeights.bold,
          color: theme.text.primary,
          fontFamily: theme.fonts.primary.bold || theme.fonts.default.bold,
        },
        originalPrice: {
          marginLeft: 8,
          fontSize: fontSizes.tiny,
          fontWeight: fontWeights.regular,
          color: theme.text.septenary,
          textDecorationLine: 'line-through',
        },
        rating: {
          marginTop: 4,
        },
        reviewCount: {
          fontSize: fontSizes.mini,
          color: theme.text.primary,
        },
      }),
    [
      theme,
      width,
      height,
      isSecondaryType,
      isDark,
      imageSize.width,
      imageSize.height,
      isPTertiaryType,
    ],
  );

  const {originalPrice, promoPrice} = useMemo(
    () => ({
      promoPrice: discount ? formatAmount((price * discount) / 100) : 0,
      originalPrice: formatAmount(price),
    }),
    [price, discount],
  );

  const handlePressCard = useCallback(() => {
    onPress?.(item);
  }, [item, onPress]);

  return (
    <TouchableOpacity
      testID="product-card"
      style={themeStyles.wrapper}
      activeOpacity={0.8}
      onPress={handlePressCard}>
      <Flex style={themeStyles.image} position="relative">
        <Image
          source={{
            uri: image,
          }}
          width={imageSize.width as number}
          height={imageSize.height as number}
        />
        {type === ProductCardType.Primary && (
          <Flex style={themeStyles.icon}>
            <HeartIcon isActive={isFavorite} />
          </Flex>
        )}
      </Flex>
      <Flex justify="center">
        <Text style={themeStyles.name}>{name}</Text>
        <Flex marginTop={10} direction="row" align="center">
          <Text style={themeStyles.promoPrice}>
            {`${CURRENCY_UNIT} ${promoPrice || originalPrice}`}
          </Text>
          {!!promoPrice && (
            <Text style={themeStyles.originalPrice}>{`${CURRENCY_UNIT} ${originalPrice}`}</Text>
          )}
        </Flex>
        {isPrimaryType && (
          <Flex marginTop={4} direction="row" align="center">
            <Rating value={rating} />
            <Text style={themeStyles.reviewCount}>{` (${reviewCount})`}</Text>
          </Flex>
        )}
      </Flex>
    </TouchableOpacity>
  );
};

export default memo(ProductCard);
