import {render} from '@testing-library/react-native';

import {COLORS} from '@/mocks';
import Dot from '..';

describe('Dot Component', () => {
  const onSelect = jest.fn();
  const props = {
    color: COLORS[0],
    hasBorder: false,
    onSelect,
  };
  it('renders correctly with no border', () => {
    const {toJSON} = render(<Dot {...props} />);

    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly with border', () => {
    const {toJSON} = render(<Dot {...props} hasBorder />);

    expect(toJSON()).toMatchSnapshot();
  });
});
