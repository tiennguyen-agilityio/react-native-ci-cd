import {render, fireEvent, screen} from '@testing-library/react-native';
import Checkbox from '..';

const onValueChange = jest.fn();

describe('Checkbox', () => {
  const props = {
    selected: false,
    label: 'Label checkbox',
    onValueChange,
  };

  it('renders with label', () => {
    const {toJSON} = render(<Checkbox {...props} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders with no label', () => {
    const {toJSON} = render(<Checkbox onValueChange={onValueChange} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders with selected false', () => {
    const {toJSON} = render(<Checkbox {...props} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders with selected true', () => {
    const {toJSON} = render(<Checkbox {...props} selected={true} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders with selected true, disabled true', () => {
    const {toJSON} = render(<Checkbox {...props} selected disabled />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders with disabled true', () => {
    const {toJSON} = render(<Checkbox {...props} disabled />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('calls onValueChange when pressed', () => {
    render(<Checkbox label="Click me" onValueChange={onValueChange} />);

    fireEvent.press(screen.getByText('Click me'));

    expect(onValueChange).toHaveBeenCalled();
  });
});
