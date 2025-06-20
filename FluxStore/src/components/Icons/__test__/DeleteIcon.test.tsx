import {render, fireEvent, screen} from '@testing-library/react-native';

import {DeleteIcon} from '../DeleteIcon';

describe('DeleteIcon', () => {
  const onPress = jest.fn();

  it('renders correctly (matches snapshot)', () => {
    const {toJSON} = render(<DeleteIcon />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly (matches snapshot) with isActive', () => {
    const {toJSON} = render(<DeleteIcon isActive />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('calls onPress when touched and not disabled', () => {
    render(<DeleteIcon onPress={onPress} />);

    fireEvent.press(screen.getByTestId('delete-icon'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does NOT call onPress when disabled', () => {
    render(<DeleteIcon onPress={onPress} disabled />);

    fireEvent.press(screen.getByTestId('delete-icon'));

    expect(onPress).not.toHaveBeenCalledTimes(0);
  });
});
