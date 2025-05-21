import {render, fireEvent, screen} from '@testing-library/react-native';

import {WomenIcon} from '../WomenIcon';

describe('WomenIcon', () => {
  const onPress = jest.fn();

  it('renders correctly (matches snapshot)', () => {
    const {toJSON} = render(<WomenIcon />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly (matches snapshot) with isActive', () => {
    const {toJSON} = render(<WomenIcon isActive />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('calls onPress when touched and not disabled', () => {
    render(<WomenIcon onPress={onPress} />);

    fireEvent.press(screen.getByTestId('women-icon'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does NOT call onPress when disabled', () => {
    render(<WomenIcon onPress={onPress} disabled />);

    fireEvent.press(screen.getByTestId('women-icon'));

    expect(onPress).not.toHaveBeenCalledTimes(0);
  });
});
