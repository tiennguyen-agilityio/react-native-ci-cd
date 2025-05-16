import {render} from '@testing-library/react-native';

import Rating from '..';

describe('Rating', () => {
  it('should render default props', () => {
    const {toJSON} = render(<Rating />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('should render Rating component with value is a decimal number', () => {
    const props = {
      value: 2,
      size: 20,
    };
    const {toJSON} = render(<Rating {...props} />);

    expect(toJSON()).toMatchSnapshot();
  });
});
