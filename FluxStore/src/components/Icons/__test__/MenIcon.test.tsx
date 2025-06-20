import {render, fireEvent, screen} from '@testing-library/react-native';

import {MenIcon} from '../MenIcon';

describe('MenIcon', () => {
  const onPress = jest.fn();

  it('renders correctly (matches snapshot)', () => {
    const {toJSON} = render(<MenIcon />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly (matches snapshot) with isActive', () => {
    const {toJSON} = render(<MenIcon isActive />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('calls onPress when touched and not disabled', () => {
    render(<MenIcon onPress={onPress} />);

    fireEvent.press(screen.getByTestId('men-icon'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does NOT call onPress when disabled', () => {
    render(<MenIcon onPress={onPress} disabled />);

    fireEvent.press(screen.getByTestId('men-icon'));

    expect(onPress).not.toHaveBeenCalledTimes(0);
  });
});
