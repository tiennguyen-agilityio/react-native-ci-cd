import {fireEvent, render, screen, waitFor} from '@testing-library/react-native';

import ProductCard, {ProductCardType} from '..';
import {PRODUCTS} from '@/mocks';

describe('ProductCard', () => {
  const onPress = jest.fn();
  const props = {
    item: PRODUCTS[0],
    onPress,
  };

  it('should render ProductCard component', () => {
    const {toJSON} = render(<ProductCard {...props} />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('should render ProductCard has not discount', () => {
    const {toJSON} = render(<ProductCard {...props} item={PRODUCTS[1]} />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('should render type Secondary', () => {
    const {toJSON} = render(<ProductCard {...props} type={ProductCardType.Secondary} />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('should render Tertiary', () => {
    const {toJSON} = render(<ProductCard {...props} type={ProductCardType.Tertiary} />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('should render isFavorite', () => {
    const {toJSON} = render(<ProductCard isFavorite {...props} />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('calls onPress when card clicked', async () => {
    render(<ProductCard {...props} />);

    const decrementIcon = screen.getByTestId('product-card');
    fireEvent.press(decrementIcon);

    await waitFor(() => {
      expect(onPress).toHaveBeenCalled();
    });
  });
});
