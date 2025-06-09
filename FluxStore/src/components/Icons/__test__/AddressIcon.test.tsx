import {render, fireEvent, screen} from '@testing-library/react-native';

import {AddressIcon} from '../AddressIcon';

describe('AddressIcon', () => {
  const onPress = jest.fn();

  it('renders correctly (matches snapshot)', () => {
    const {toJSON} = render(<AddressIcon />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('calls onPress when touched and not disabled', () => {
    render(<AddressIcon onPress={onPress} />);

    fireEvent.press(screen.getByTestId('address-icon'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does NOT call onPress when disabled', () => {
    render(<AddressIcon onPress={onPress} disabled />);

    fireEvent.press(screen.getByTestId('address-icon'));

    expect(onPress).not.toHaveBeenCalledTimes(0);
  });
});
