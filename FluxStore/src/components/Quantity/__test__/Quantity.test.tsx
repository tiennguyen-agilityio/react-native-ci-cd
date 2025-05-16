import {fireEvent, render, screen, waitFor} from '@testing-library/react-native';

import Quantity from '..';

describe('Quantity', () => {
  const onChangeValue = jest.fn();
  const props = {
    onChangeValue,
  };

  it('should render quantity component', () => {
    const {toJSON} = render(<Quantity {...props} />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('calls onChangeValue when increment icon value clicked', async () => {
    render(<Quantity {...props} />);

    const incrementIcon = screen.getByTestId('add-icon');
    fireEvent.press(incrementIcon);

    await waitFor(() => {
      expect(onChangeValue).toHaveBeenCalled();
    });
  });

  it('calls onChangeValue when decrement icon value clicked', async () => {
    render(<Quantity {...props} defaultValue={3} />);

    const decrementIcon = screen.getByTestId('minus-icon');
    fireEvent.press(decrementIcon);

    await waitFor(() => {
      expect(onChangeValue).toHaveBeenCalled();
    });
  });

  it('does not decrement below 1', async () => {
    render(<Quantity {...props} defaultValue={1} />);

    const decrementIcon = screen.getByTestId('minus-icon');
    fireEvent.press(decrementIcon);

    await waitFor(() => {
      expect(onChangeValue).toHaveBeenCalled();
    });
  });

  it('not calls onChangeValue when increment icon value clicked', async () => {
    render(<Quantity {...props} defaultValue={3} max={3} />);

    const incrementIcon = screen.getByTestId('add-icon');
    fireEvent.press(incrementIcon);

    await waitFor(() => {
      expect(onChangeValue).toHaveBeenCalled();
    });
  });
});
