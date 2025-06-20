import {render, fireEvent, screen} from '@testing-library/react-native';

import {AppleIcon} from '../AppleIcon';

describe('AppleIcon', () => {
  const onPress = jest.fn();

  it('renders correctly (matches snapshot)', () => {
    const {toJSON} = render(<AppleIcon />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('calls onPress when touched and not disabled', () => {
    render(<AppleIcon onPress={onPress} />);

    fireEvent.press(screen.getByTestId('apple-icon'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does NOT call onPress when disabled', () => {
    render(<AppleIcon onPress={onPress} disabled />);

    fireEvent.press(screen.getByTestId('apple-icon'));

    expect(onPress).not.toHaveBeenCalledTimes(0);
  });
});
