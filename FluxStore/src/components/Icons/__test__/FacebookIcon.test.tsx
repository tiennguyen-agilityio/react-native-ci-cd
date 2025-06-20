import {render, fireEvent, screen} from '@testing-library/react-native';

import {FacebookIcon} from '../FacebookIcon';

describe('FaceBookIcon', () => {
  const onPress = jest.fn();

  it('renders correctly (matches snapshot)', () => {
    const {toJSON} = render(<FacebookIcon />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('calls onPress when touched and not disabled', () => {
    render(<FacebookIcon onPress={onPress} />);

    fireEvent.press(screen.getByTestId('facebook-icon'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does NOT call onPress when disabled', () => {
    render(<FacebookIcon onPress={onPress} disabled />);

    fireEvent.press(screen.getByTestId('facebook-icon'));

    expect(onPress).not.toHaveBeenCalledTimes(0);
  });
});
