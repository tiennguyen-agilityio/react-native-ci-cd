import {render} from '@testing-library/react-native';

import {COLORS} from '@/mocks';
import ColorPicker from '..';

describe('ColorPicker Component', () => {
  const onValueChange = jest.fn();
  const props = {
    colors: COLORS,
    onValueChange,
  };
  it('renders correctly', () => {
    const {toJSON} = render(<ColorPicker {...props} />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly with defaultIndex 1', () => {
    const {toJSON} = render(<ColorPicker {...props} defaultValue={COLORS[0]} />);

    expect(toJSON()).toMatchSnapshot();
  });
});
