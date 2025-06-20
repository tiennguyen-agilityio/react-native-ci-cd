import {Meta, StoryObj} from '@storybook/react';

import CartItem from '.';
import {CARTS} from '@/mocks';
import {useState} from 'react';
import {Alert} from 'react-native';

const meta: Meta<typeof CartItem> = {
  title: 'Components/CartItem',
  component: CartItem,
};

export default meta;

type Story = StoryObj<typeof CartItem>;

const defaultProps = {
  ...CARTS[0],
};

const Render = ({isChecked}: {isChecked: boolean}) => {
  const [isCheckActive, setIsCheckActive] = useState(isChecked);
  const [quantity, setQuantity] = useState(1);

  const handleChangeChecked = () => {
    setIsCheckActive(!isCheckActive);
    Alert.alert(`Handle change checked ${!isCheckActive}`);
  };

  const handleChangeQuantity = (amount: number) => {
    setQuantity(amount);
    Alert.alert(`Handle change quantity ${amount}`);
  };

  return (
    <CartItem
      {...defaultProps}
      isChecked={isCheckActive}
      quantity={quantity}
      onChangeChecked={handleChangeChecked}
      onChangeQuantity={handleChangeQuantity}
    />
  );
};

export const Primary: Story = {
  render: Render,
};

export const Secondary: Story = {
  render: () => Render({isChecked: true}),
};
