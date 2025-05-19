import {render} from '@testing-library/react-native';

import BannerCard from '..';
import {BANNERS} from '@/mocks';

describe('BannerCard', () => {
  const props = {
    title: BANNERS[1].title,
    imageUrl: BANNERS[1].imageUrl,
  };

  it('should render BannerCard component', () => {
    const {toJSON} = render(<BannerCard {...props} />);

    expect(toJSON()).toMatchSnapshot();
  });
});
