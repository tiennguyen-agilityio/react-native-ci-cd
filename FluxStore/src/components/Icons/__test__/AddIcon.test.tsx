import {render, fireEvent, screen} from '@testing-library/react-native';

import {AddIcon} from '../AddIcon';

describe('AddIcon', () => {
  const onPress = jest.fn();

  it('renders correctly (matches snapshot)', () => {
    const {toJSON} = render(<AddIcon />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('calls onPress when touched and not disabled', () => {
    render(<AddIcon onPress={onPress} />);

    fireEvent.press(screen.getByTestId('add-icon'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does NOT call onPress when disabled', () => {
    render(<AddIcon onPress={onPress} disabled />);

    fireEvent.press(screen.getByTestId('add-icon'));

    expect(onPress).not.toHaveBeenCalledTimes(0);
  });
});
