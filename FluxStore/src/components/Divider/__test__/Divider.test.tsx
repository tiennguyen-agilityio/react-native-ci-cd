import {render} from '@testing-library/react-native';

import {colors} from '@/themes';
import Divider from '..';

describe('Divider', () => {
  it('should render default props', () => {
    const {toJSON} = render(<Divider />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('should render with customize props', () => {
    const props = {
      width: 300,
      height: 5,
      color: colors.green[500],
    };
    const {toJSON} = render(<Divider {...props} />);

    expect(toJSON()).toMatchSnapshot();
  });
});
