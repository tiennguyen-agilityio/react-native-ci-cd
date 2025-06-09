import {render} from '@testing-library/react-native';

import {CartCompletedIcon} from '../CartCompletedIcon';

describe('CartCompletedIcon', () => {
  it('renders correctly (matches snapshot)', () => {
    const {toJSON} = render(<CartCompletedIcon />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly (matches snapshot) with isActive true', () => {
    const {toJSON} = render(<CartCompletedIcon isActive />);
    expect(toJSON()).toMatchSnapshot();
  });
});
