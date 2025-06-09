import {render, fireEvent, screen} from '@testing-library/react-native';

import {SettingIcon} from '../SettingIcon';

describe('SettingIcon', () => {
  const onPress = jest.fn();

  it('renders correctly (matches snapshot)', () => {
    const {toJSON} = render(<SettingIcon />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly (matches snapshot) with isActive true', () => {
    const {toJSON} = render(<SettingIcon isActive />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('calls onPress when touched and not disabled', () => {
    render(<SettingIcon onPress={onPress} />);

    fireEvent.press(screen.getByTestId('setting-icon'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does NOT call onPress when disabled', () => {
    render(<SettingIcon onPress={onPress} disabled />);

    fireEvent.press(screen.getByTestId('setting-icon'));

    expect(onPress).not.toHaveBeenCalledTimes(0);
  });
});
