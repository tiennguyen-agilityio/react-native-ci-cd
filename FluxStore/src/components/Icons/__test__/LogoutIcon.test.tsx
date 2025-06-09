import {render, fireEvent, screen} from '@testing-library/react-native';

import {LogoutIcon} from '../LogoutIcon';

describe('LogoutIcon', () => {
  const onPress = jest.fn();

  it('renders correctly (matches snapshot)', () => {
    const {toJSON} = render(<LogoutIcon />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('calls onPress when touched and not disabled', () => {
    render(<LogoutIcon onPress={onPress} />);

    fireEvent.press(screen.getByTestId('logout-icon'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does NOT call onPress when disabled', () => {
    render(<LogoutIcon onPress={onPress} disabled />);

    fireEvent.press(screen.getByTestId('logout-icon'));

    expect(onPress).not.toHaveBeenCalledTimes(0);
  });
});
