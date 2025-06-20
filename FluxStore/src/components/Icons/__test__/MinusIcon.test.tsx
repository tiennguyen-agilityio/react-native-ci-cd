import {render, fireEvent, screen} from '@testing-library/react-native';

import {MinusIcon} from '../MinusIcon';

describe('MinusIcon', () => {
  const onPress = jest.fn();

  it('renders correctly (matches snapshot)', () => {
    const {toJSON} = render(<MinusIcon />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly (matches snapshot) with isActive', () => {
    const {toJSON} = render(<MinusIcon isActive />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('calls onPress when touched and not disabled', () => {
    render(<MinusIcon onPress={onPress} />);

    fireEvent.press(screen.getByTestId('minus-icon'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does NOT call onPress when disabled', () => {
    render(<MinusIcon onPress={onPress} disabled />);

    fireEvent.press(screen.getByTestId('minus-icon'));

    expect(onPress).not.toHaveBeenCalledTimes(0);
  });
});
