import {render, fireEvent, screen} from '@testing-library/react-native';

import {CheckBoxIcon} from '../CheckBoxIcon';

describe('CheckBoxIcon', () => {
  const onPress = jest.fn();

  it('renders correctly (matches snapshot)', () => {
    const {toJSON} = render(<CheckBoxIcon />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly (matches snapshot) with isActive true', () => {
    const {toJSON} = render(<CheckBoxIcon isActive />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('calls onPress when touched and not disabled', () => {
    render(<CheckBoxIcon onPress={onPress} />);

    fireEvent.press(screen.getByTestId('checkbox-icon'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does NOT call onPress when disabled', () => {
    render(<CheckBoxIcon onPress={onPress} disabled />);

    fireEvent.press(screen.getByTestId('checkbox-icon'));

    expect(onPress).not.toHaveBeenCalledTimes(0);
  });
});
