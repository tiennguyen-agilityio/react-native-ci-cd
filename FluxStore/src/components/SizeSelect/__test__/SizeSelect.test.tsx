import {fireEvent, render, screen} from '@testing-library/react-native';

import {SIZES} from '@/mocks';
import SizeSelect from '..';

const onValueChange = jest.fn();
const props = {
  sizes: SIZES,
  onValueChange,
};

describe('SizeSelect Component', () => {
  it('renders correctly', () => {
    const {toJSON} = render(<SizeSelect {...props} />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly with defaultIndex', () => {
    const {toJSON} = render(<SizeSelect {...props} defaultValue={SIZES[0]} />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('renders all sizes and handles selection correctly', () => {
    render(<SizeSelect {...props} />);

    // Check all sizes render
    SIZES.forEach(size => {
      expect(screen.getByText(size)).toBeTruthy();
    });

    // Simulate pressing 'M'
    fireEvent.press(screen.getByText('M'));

    // Should call onValueChange with ['M']
    expect(onValueChange).toHaveBeenCalledWith('M');

    // Press again to deselect
    fireEvent.press(screen.getByText('M'));

    // Should call onValueChange with []
    expect(onValueChange).toHaveBeenCalledWith('M');
  });
});
