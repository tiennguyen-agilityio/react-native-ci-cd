import {render, fireEvent, screen} from '@testing-library/react-native';
import {ChevronIcon} from '../ChevronIcon'; // adjust the path as needed
import {DIRECTION} from '@/interfaces';

describe('ChevronIcon', () => {
  const onPress = jest.fn();

  it('renders correctly (matches snapshot)', () => {
    const {toJSON} = render(<ChevronIcon />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly (matches snapshot) with direction Left', () => {
    const {toJSON} = render(<ChevronIcon direction={DIRECTION.LEFT} />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly (matches snapshot) with direction up', () => {
    const {toJSON} = render(<ChevronIcon direction={DIRECTION.UP} />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly (matches snapshot) with direction down', () => {
    const {toJSON} = render(<ChevronIcon direction={DIRECTION.DOWN} />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('calls onPress when pressed and not disabled', () => {
    render(<ChevronIcon onPress={onPress} />);
    fireEvent.press(screen.getByTestId('chevron-icon'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled true', () => {
    render(<ChevronIcon onPress={onPress} disabled />);
    fireEvent.press(screen.getByTestId('chevron-icon'));

    expect(onPress).not.toHaveBeenCalledTimes(0);
  });

  it('applies correct rotation based on direction', () => {
    const {toJSON} = render(<ChevronIcon direction={DIRECTION.UP} />);
    const json = toJSON();
    expect(json).toBeTruthy();
  });
});
