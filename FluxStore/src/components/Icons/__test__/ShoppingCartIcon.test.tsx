import {render, fireEvent, screen} from '@testing-library/react-native';

import {ShoppingCartIcon} from '../ShoppingCartIcon';

describe('ShoppingCartIcon', () => {
  const onPress = jest.fn();

  it('renders correctly (matches snapshot)', () => {
    const {toJSON} = render(<ShoppingCartIcon />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly (matches snapshot) with isActive true', () => {
    const {toJSON} = render(<ShoppingCartIcon isActive />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('calls onPress when touched and not disabled', () => {
    render(<ShoppingCartIcon onPress={onPress} />);

    fireEvent.press(screen.getByTestId('shopping-cart-icon'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does NOT call onPress when disabled', () => {
    render(<ShoppingCartIcon onPress={onPress} disabled />);

    fireEvent.press(screen.getByTestId('shopping-cart-icon'));

    expect(onPress).not.toHaveBeenCalledTimes(0);
  });
});
