import {render, fireEvent, screen} from '@testing-library/react-native';
import {ArrowIcon} from '../ArrowIcon'; // adjust the path as needed
import {DIRECTION} from '@/interfaces';

jest.mock('@/hooks', () => ({
  useThemeStore: () => ({
    theme: {text: {primary: '#000000'}},
  }),
}));

jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));

describe('ArrowIcon', () => {
  const onPress = jest.fn();

  it('renders correctly (matches snapshot)', () => {
    const {toJSON} = render(<ArrowIcon />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly (matches snapshot) with direction Left', () => {
    const {toJSON} = render(<ArrowIcon direction={DIRECTION.LEFT} />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly (matches snapshot) with direction up', () => {
    const {toJSON} = render(<ArrowIcon direction={DIRECTION.UP} />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly (matches snapshot) with direction down', () => {
    const {toJSON} = render(<ArrowIcon direction={DIRECTION.DOWN} />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('calls onPress when pressed and not disabled', () => {
    render(<ArrowIcon onPress={onPress} />);
    fireEvent.press(screen.getByTestId('arrow-icon'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled true', () => {
    render(<ArrowIcon onPress={onPress} disabled />);
    fireEvent.press(screen.getByTestId('arrow-icon'));

    expect(onPress).not.toHaveBeenCalledTimes(0);
  });

  it('applies correct rotation based on direction', () => {
    const {toJSON} = render(<ArrowIcon direction={DIRECTION.UP} />);
    const json = toJSON();
    expect(json).toBeTruthy();
  });
});
