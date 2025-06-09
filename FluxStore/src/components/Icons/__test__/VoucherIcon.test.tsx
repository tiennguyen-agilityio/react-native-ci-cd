import {render, fireEvent, screen} from '@testing-library/react-native';

import {VoucherIcon} from '../VoucherIcon';

describe('VoucherIcon', () => {
  const onPress = jest.fn();

  it('renders correctly (matches snapshot)', () => {
    const {toJSON} = render(<VoucherIcon />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly (matches snapshot) with isActive true', () => {
    const {toJSON} = render(<VoucherIcon isActive />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('calls onPress when touched and not disabled', () => {
    render(<VoucherIcon onPress={onPress} />);

    fireEvent.press(screen.getByTestId('voucher-icon'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does NOT call onPress when disabled', () => {
    render(<VoucherIcon onPress={onPress} disabled />);

    fireEvent.press(screen.getByTestId('voucher-icon'));

    expect(onPress).not.toHaveBeenCalledTimes(0);
  });
});
