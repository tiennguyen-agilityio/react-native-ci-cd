import {render, fireEvent, screen} from '@testing-library/react-native';

import Button from '..';

const onPress = jest.fn();

describe('Button', () => {
  const props = {
    text: 'Click me',
    onPress,
  };

  it('should render button component with default props', () => {
    const {toJSON} = render(<Button disabled {...props} />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('should render button component with disabled', () => {
    const {toJSON} = render(<Button disabled {...props} />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('calls onClick when being clicked', () => {
    render(<Button testID="button" {...props} />);

    const button = screen.getByTestId('button');
    fireEvent.press(button);

    expect(onPress).toHaveBeenCalled();
  });
});
