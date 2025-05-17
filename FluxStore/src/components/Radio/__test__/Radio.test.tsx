import {render} from '@testing-library/react-native';

import Radio from '..';

const onPress = jest.fn();

describe('Button', () => {
  const props = {
    selected: false,
    onPress,
  };

  it('should render Radio component with default props', () => {
    const {toJSON} = render(<Radio {...props} />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('should render Radio component with size', () => {
    const {toJSON} = render(<Radio size={30} borderWidth={10} {...props} />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('renders with selected true', () => {
    const {toJSON} = render(<Radio {...props} selected />);
    expect(toJSON()).toMatchSnapshot();
  });
});
