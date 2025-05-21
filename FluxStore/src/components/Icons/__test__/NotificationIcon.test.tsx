import {render, fireEvent, screen} from '@testing-library/react-native';

import {NotificationIcon} from '../NotificationIcon';

describe('NotificationIcon', () => {
  const onPress = jest.fn();

  it('renders correctly (matches snapshot)', () => {
    const {toJSON} = render(<NotificationIcon />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly (matches snapshot) with isActive', () => {
    const {toJSON} = render(<NotificationIcon isActive />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly (matches snapshot) with isNews', () => {
    const {toJSON} = render(<NotificationIcon isNews />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('calls onPress when touched and not disabled', () => {
    render(<NotificationIcon onPress={onPress} />);

    fireEvent.press(screen.getByTestId('notification-icon'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does NOT call onPress when disabled', () => {
    render(<NotificationIcon onPress={onPress} disabled />);

    fireEvent.press(screen.getByTestId('notification-icon'));

    expect(onPress).not.toHaveBeenCalledTimes(0);
  });
});
