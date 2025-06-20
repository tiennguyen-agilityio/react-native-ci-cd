import {render, fireEvent, screen} from '@testing-library/react-native';

import {SearchIcon} from '../SearchIcon';

describe('SearchIcon', () => {
  const onPress = jest.fn();

  it('renders correctly (matches snapshot)', () => {
    const {toJSON} = render(<SearchIcon />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly (matches snapshot) with isActive', () => {
    const {toJSON} = render(<SearchIcon isActive />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('calls onPress when touched and not disabled', () => {
    render(<SearchIcon onPress={onPress} />);

    fireEvent.press(screen.getByTestId('search-icon'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does NOT call onPress when disabled', () => {
    render(<SearchIcon onPress={onPress} disabled />);

    fireEvent.press(screen.getByTestId('search-icon'));

    expect(onPress).not.toHaveBeenCalledTimes(0);
  });
});
