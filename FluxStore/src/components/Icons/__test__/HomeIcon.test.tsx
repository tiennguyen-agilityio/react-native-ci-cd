import {render, fireEvent, screen} from '@testing-library/react-native';

import {HomeIcon} from '../HomeIcon';

describe('HomeIcon', () => {
  const onPress = jest.fn();

  it('renders correctly (matches snapshot)', () => {
    const {toJSON} = render(<HomeIcon />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly (matches snapshot) with isActive', () => {
    const {toJSON} = render(<HomeIcon isActive />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('calls onPress when touched and not disabled', () => {
    render(<HomeIcon onPress={onPress} />);

    fireEvent.press(screen.getByTestId('home-icon'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does NOT call onPress when disabled', () => {
    render(<HomeIcon onPress={onPress} disabled />);

    fireEvent.press(screen.getByTestId('home-icon'));

    expect(onPress).not.toHaveBeenCalledTimes(0);
  });
});
