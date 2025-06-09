import {render, fireEvent, screen} from '@testing-library/react-native';

import {StarSecondaryIcon} from '../StarSecondaryIcon';

describe('StarSecondaryIcon', () => {
  const onPress = jest.fn();

  it('renders correctly (matches snapshot)', () => {
    const {toJSON} = render(<StarSecondaryIcon />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly (matches snapshot) with isActive true', () => {
    const {toJSON} = render(<StarSecondaryIcon isActive />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('calls onPress when touched and not disabled', () => {
    render(<StarSecondaryIcon onPress={onPress} />);

    fireEvent.press(screen.getByTestId('star-secondary-icon'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does NOT call onPress when disabled', () => {
    render(<StarSecondaryIcon onPress={onPress} disabled />);

    fireEvent.press(screen.getByTestId('star-secondary-icon'));

    expect(onPress).not.toHaveBeenCalledTimes(0);
  });
});
