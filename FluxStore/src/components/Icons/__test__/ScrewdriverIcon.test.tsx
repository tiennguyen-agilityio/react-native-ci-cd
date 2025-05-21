import {render, fireEvent, screen} from '@testing-library/react-native';

import {ScrewdriverIcon} from '../ScrewdriverIcon';

describe('ScrewdriverIcon', () => {
  const onPress = jest.fn();

  it('renders correctly (matches snapshot)', () => {
    const {toJSON} = render(<ScrewdriverIcon />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly (matches snapshot) with isActive', () => {
    const {toJSON} = render(<ScrewdriverIcon isActive />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('calls onPress when touched and not disabled', () => {
    render(<ScrewdriverIcon onPress={onPress} />);

    fireEvent.press(screen.getByTestId('screwdriver-icon'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does NOT call onPress when disabled', () => {
    render(<ScrewdriverIcon onPress={onPress} disabled />);

    fireEvent.press(screen.getByTestId('screwdriver-icon'));

    expect(onPress).not.toHaveBeenCalledTimes(0);
  });
});
