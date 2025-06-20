import {render, screen} from '@testing-library/react-native';

import Flex from '..';
import {RenderChildren} from '@/utils';

describe('Flex', () => {
  it('should render component', () => {
    const {toJSON} = render(
      <Flex>
        <RenderChildren />
      </Flex>,
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it('should render component with direction row', () => {
    const {toJSON} = render(
      <Flex {...{direction: 'row'}}>
        <RenderChildren />
      </Flex>,
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it('should render component with align items stretch', () => {
    const {toJSON} = render(
      <Flex {...{align: 'stretch'}}>
        <RenderChildren />
      </Flex>,
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it('should render component with empty children', () => {
    const {toJSON} = render(<Flex />);
    expect(toJSON()).toMatchSnapshot();
  });

  test('Should render children elements', () => {
    render(
      <Flex {...{align: 'stretch'}}>
        <RenderChildren />
      </Flex>,
    );
    const {children} = screen.getByTestId('flex');

    expect(children).toHaveLength(1);
  });
});
