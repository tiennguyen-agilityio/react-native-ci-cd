import {render, fireEvent, screen} from '@testing-library/react-native';

import {FilterIcon} from '../FilterIcon';

describe('FilterIcon', () => {
  const onPress = jest.fn();

  it('renders correctly (matches snapshot)', () => {
    const {toJSON} = render(<FilterIcon />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly (matches snapshot) with isActive', () => {
    const {toJSON} = render(<FilterIcon isActive />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('calls onPress when touched and not disabled', () => {
    render(<FilterIcon onPress={onPress} />);

    fireEvent.press(screen.getByTestId('filter-icon'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does NOT call onPress when disabled', () => {
    render(<FilterIcon onPress={onPress} disabled />);

    fireEvent.press(screen.getByTestId('filter-icon'));

    expect(onPress).not.toHaveBeenCalledTimes(0);
  });
});
