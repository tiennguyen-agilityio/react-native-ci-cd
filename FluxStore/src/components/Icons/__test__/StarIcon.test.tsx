import {render, fireEvent, screen} from '@testing-library/react-native';

import {StarIcon} from '../StarIcon';

describe('StarIcon', () => {
  const onPress = jest.fn();

  it('renders correctly (matches snapshot)', () => {
    const {toJSON} = render(<StarIcon />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly (matches snapshot) with isActive', () => {
    const {toJSON} = render(<StarIcon isActive />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('calls onPress when touched and not disabled', () => {
    render(<StarIcon onPress={onPress} />);

    fireEvent.press(screen.getByTestId('star-icon'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does NOT call onPress when disabled', () => {
    render(<StarIcon onPress={onPress} disabled />);

    fireEvent.press(screen.getByTestId('star-icon'));

    expect(onPress).not.toHaveBeenCalledTimes(0);
  });
});
