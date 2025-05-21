import {render, fireEvent, screen} from '@testing-library/react-native';

import {MenuIcon} from '../MenuIcon';

describe('MenuIcon', () => {
  const onPress = jest.fn();

  it('renders correctly (matches snapshot)', () => {
    const {toJSON} = render(<MenuIcon />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly (matches snapshot) with isActive', () => {
    const {toJSON} = render(<MenuIcon isActive />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('calls onPress when touched and not disabled', () => {
    render(<MenuIcon onPress={onPress} />);

    fireEvent.press(screen.getByTestId('menu-icon'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does NOT call onPress when disabled', () => {
    render(<MenuIcon onPress={onPress} disabled />);

    fireEvent.press(screen.getByTestId('menu-icon'));

    expect(onPress).not.toHaveBeenCalledTimes(0);
  });
});
