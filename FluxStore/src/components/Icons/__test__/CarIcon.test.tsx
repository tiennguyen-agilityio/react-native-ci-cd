import {render, fireEvent, screen} from '@testing-library/react-native';

import {CartIcon, CartIconType} from '../CartIcon';

describe('CartIcon', () => {
  const onPress = jest.fn();

  it('renders correctly (matches snapshot)', () => {
    const {toJSON} = render(<CartIcon />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly (matches snapshot) with type Secondary', () => {
    const {toJSON} = render(<CartIcon type={CartIconType.Secondary} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly (matches snapshot) with isActive true', () => {
    const {toJSON} = render(<CartIcon isActive />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('calls onPress when touched and not disabled', () => {
    render(<CartIcon onPress={onPress} />);

    fireEvent.press(screen.getByTestId('cart-icon'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does NOT call onPress when disabled', () => {
    render(<CartIcon onPress={onPress} disabled />);

    fireEvent.press(screen.getByTestId('cart-icon'));

    expect(onPress).not.toHaveBeenCalledTimes(0);
  });
});
