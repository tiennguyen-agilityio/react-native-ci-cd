import {render, fireEvent, screen} from '@testing-library/react-native';

import {UserIcon} from '../UserIcon';

describe('UserIcon', () => {
  const onPress = jest.fn();

  it('renders correctly (matches snapshot)', () => {
    const {toJSON} = render(<UserIcon />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly (matches snapshot) with isActive', () => {
    const {toJSON} = render(<UserIcon isActive />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('calls onPress when touched and not disabled', () => {
    render(<UserIcon onPress={onPress} />);

    fireEvent.press(screen.getByTestId('user-icon'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does NOT call onPress when disabled', () => {
    render(<UserIcon onPress={onPress} disabled />);

    fireEvent.press(screen.getByTestId('user-icon'));

    expect(onPress).not.toHaveBeenCalledTimes(0);
  });
});
