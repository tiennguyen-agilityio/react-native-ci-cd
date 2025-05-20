import {render} from '@testing-library/react-native';

import {COLORS} from '@/mocks';
import ColorPicker from '..';

describe('ColorPicker Component', () => {
  const onChangeValue = jest.fn();
  const props = {
    label: 'Color',
    colors: COLORS,
    onChangeValue,
  };
  it('renders correctly', () => {
    const {toJSON} = render(<ColorPicker {...props} />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly with defaultIndex 1', () => {
    const {toJSON} = render(<ColorPicker {...props} defaultIndex={1} />);

    expect(toJSON()).toMatchSnapshot();
  });
});
