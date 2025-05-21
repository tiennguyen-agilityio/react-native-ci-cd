import {render, fireEvent, screen} from '@testing-library/react-native';

import {EyeglassesIcon} from '../EyeglassesIcon';

describe('EyeglassesIcon', () => {
  const onPress = jest.fn();

  it('renders correctly (matches snapshot)', () => {
    const {toJSON} = render(<EyeglassesIcon />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly (matches snapshot) with isActive', () => {
    const {toJSON} = render(<EyeglassesIcon isActive />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('calls onPress when touched and not disabled', () => {
    render(<EyeglassesIcon onPress={onPress} />);

    fireEvent.press(screen.getByTestId('eyeglasses-icon'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does NOT call onPress when disabled', () => {
    render(<EyeglassesIcon onPress={onPress} disabled />);

    fireEvent.press(screen.getByTestId('eyeglasses-icon'));

    expect(onPress).not.toHaveBeenCalledTimes(0);
  });
});
