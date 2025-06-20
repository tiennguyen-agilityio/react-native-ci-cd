import {render, fireEvent, screen} from '@testing-library/react-native';

import {GoogleIcon} from '../GoogleIcon';

describe('GoogleIcon', () => {
  const onPress = jest.fn();

  it('renders correctly (matches snapshot)', () => {
    const {toJSON} = render(<GoogleIcon />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('calls onPress when touched and not disabled', () => {
    render(<GoogleIcon onPress={onPress} />);

    fireEvent.press(screen.getByTestId('google-icon'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does NOT call onPress when disabled', () => {
    render(<GoogleIcon onPress={onPress} disabled />);

    fireEvent.press(screen.getByTestId('google-icon'));

    expect(onPress).not.toHaveBeenCalledTimes(0);
  });
});
