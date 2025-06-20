import {render, fireEvent, screen} from '@testing-library/react-native';

import {PencilIcon} from '../PencilIcon';

describe('PencilIcon', () => {
  const onPress = jest.fn();

  it('renders correctly (matches snapshot)', () => {
    const {toJSON} = render(<PencilIcon />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly (matches snapshot) with isActive', () => {
    const {toJSON} = render(<PencilIcon isActive />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('calls onPress when touched and not disabled', () => {
    render(<PencilIcon onPress={onPress} />);

    fireEvent.press(screen.getByTestId('pencil-icon'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does NOT call onPress when disabled', () => {
    render(<PencilIcon onPress={onPress} disabled />);

    fireEvent.press(screen.getByTestId('pencil-icon'));

    expect(onPress).not.toHaveBeenCalledTimes(0);
  });
});
