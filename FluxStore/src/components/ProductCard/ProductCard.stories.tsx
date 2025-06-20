import {Alert} from 'react-native';
import {Meta, StoryObj} from '@storybook/react';

import {Product} from '@/interfaces';
import {PRODUCTS} from '@/mocks';

import ProductCard, {ProductCardProps, ProductCardType} from '.';

const meta: Meta<typeof ProductCard> = {
  title: 'Components/ProductCard',
  component: ProductCard,
};

export default meta;

type Story = StoryObj<typeof ProductCard>;

const defaultProps: ProductCardProps = {
  item: PRODUCTS[1],
  isFavorite: true,
  onPress: (item: Product) => Alert.alert('Click Product id', item.id),
};

const Render = (props: ProductCardProps) => {
  return <ProductCard {...defaultProps} {...props} />;
};

export const Primary: Story = {
  render: () => <Render {...defaultProps} width={141} height={253} />,
};

export const Secondary: Story = {
  render: () => (
    <Render {...defaultProps} width={203} height={66} type={ProductCardType.Secondary} />
  ),
};

export const Tertiary: Story = {
  render: () => (
    <Render {...defaultProps} width={126} height={227} type={ProductCardType.Tertiary} />
  ),
};
