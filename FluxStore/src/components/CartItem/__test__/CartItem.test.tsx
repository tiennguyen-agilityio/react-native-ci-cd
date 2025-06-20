import {render} from '@testing-library/react-native';

import CartItem from '..';
import {CARTS} from '@/mocks';

describe('CartItem', () => {
  const onChangeChecked = jest.fn();
  const onChangeQuantity = jest.fn();

  const props = {
    ...CARTS[0],
    onChangeChecked,
    onChangeQuantity,
  };

  it('should render CartItem component', () => {
    const {toJSON} = render(<CartItem {...props} />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('should render CartItem with isChecked true', () => {
    const {toJSON} = render(<CartItem {...props} isChecked />);

    expect(toJSON()).toMatchSnapshot();
  });
});
