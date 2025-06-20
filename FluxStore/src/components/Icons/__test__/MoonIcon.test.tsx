import {render, fireEvent, screen} from '@testing-library/react-native';

import {MoonIcon} from '../MoonIcon';

describe('MoonIcon', () => {
  const onPress = jest.fn();

  it('renders correctly (matches snapshot)', () => {
    const {toJSON} = render(<MoonIcon />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly (matches snapshot) with isActive true', () => {
    const {toJSON} = render(<MoonIcon isActive />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('calls onPress when touched and not disabled', () => {
    render(<MoonIcon onPress={onPress} />);

    fireEvent.press(screen.getByTestId('moon-icon'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does NOT call onPress when disabled', () => {
    render(<MoonIcon onPress={onPress} disabled />);

    fireEvent.press(screen.getByTestId('moon-icon'));

    expect(onPress).not.toHaveBeenCalledTimes(0);
  });
});
