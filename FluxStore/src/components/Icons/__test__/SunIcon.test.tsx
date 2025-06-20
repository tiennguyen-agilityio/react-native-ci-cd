import {render, fireEvent, screen} from '@testing-library/react-native';

import {SunIcon} from '../SunIcon';

describe('SunIcon', () => {
  const onPress = jest.fn();

  it('renders correctly (matches snapshot)', () => {
    const {toJSON} = render(<SunIcon />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly (matches snapshot) with isActive true', () => {
    const {toJSON} = render(<SunIcon isActive />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('calls onPress when touched and not disabled', () => {
    render(<SunIcon onPress={onPress} />);

    fireEvent.press(screen.getByTestId('sun-icon'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does NOT call onPress when disabled', () => {
    render(<SunIcon onPress={onPress} disabled />);

    fireEvent.press(screen.getByTestId('sun-icon'));

    expect(onPress).not.toHaveBeenCalledTimes(0);
  });
});
