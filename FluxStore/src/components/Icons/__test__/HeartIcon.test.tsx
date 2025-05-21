import {render, fireEvent, screen} from '@testing-library/react-native';

import {HeartIcon} from '../HeartIcon';

describe('HeartIcon', () => {
  const onPress = jest.fn();

  it('renders correctly (matches snapshot)', () => {
    const {toJSON} = render(<HeartIcon />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly (matches snapshot) with isActive', () => {
    const {toJSON} = render(<HeartIcon isActive />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('calls onPress when touched and not disabled', () => {
    render(<HeartIcon onPress={onPress} />);

    fireEvent.press(screen.getByTestId('heart-icon'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does NOT call onPress when disabled', () => {
    render(<HeartIcon onPress={onPress} disabled />);

    fireEvent.press(screen.getByTestId('heart-icon'));

    expect(onPress).not.toHaveBeenCalledTimes(0);
  });
});
