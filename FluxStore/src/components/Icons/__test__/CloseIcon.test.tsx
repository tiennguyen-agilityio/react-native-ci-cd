import {render, fireEvent, screen} from '@testing-library/react-native';

import {CloseIcon} from '../CloseIcon';

describe('CloseIcon', () => {
  const onPress = jest.fn();

  it('renders correctly (matches snapshot)', () => {
    const {toJSON} = render(<CloseIcon />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('calls onPress when touched and not disabled', () => {
    render(<CloseIcon onPress={onPress} />);

    fireEvent.press(screen.getByTestId('close-icon'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does NOT call onPress when disabled', () => {
    render(<CloseIcon onPress={onPress} disabled />);

    fireEvent.press(screen.getByTestId('close-icon'));

    expect(onPress).not.toHaveBeenCalledTimes(0);
  });
});
