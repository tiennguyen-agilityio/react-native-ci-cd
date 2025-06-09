import {render, fireEvent, screen} from '@testing-library/react-native';

import {WalletIcon} from '../WalletIcon';

describe('WalletIcon', () => {
  const onPress = jest.fn();

  it('renders correctly (matches snapshot)', () => {
    const {toJSON} = render(<WalletIcon />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly (matches snapshot) with isActive true', () => {
    const {toJSON} = render(<WalletIcon isActive />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('calls onPress when touched and not disabled', () => {
    render(<WalletIcon onPress={onPress} />);

    fireEvent.press(screen.getByTestId('wallet-icon'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does NOT call onPress when disabled', () => {
    render(<WalletIcon onPress={onPress} disabled />);

    fireEvent.press(screen.getByTestId('wallet-icon'));

    expect(onPress).not.toHaveBeenCalledTimes(0);
  });
});
