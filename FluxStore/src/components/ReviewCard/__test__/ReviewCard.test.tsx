import {render} from '@testing-library/react-native';

import ReviewCard from '..';
import {REVIEWS} from '@/mocks';

describe('ReviewCard', () => {
  const props = {
    avatarUrl: REVIEWS[0].avatarUrl,
    name: REVIEWS[0].name,
    rating: REVIEWS[0].rating,
    comment: REVIEWS[0].comment,
    createdAt: new Date().getTime(),
  };

  it('should render ReviewCard component', () => {
    const {toJSON} = render(<ReviewCard {...props} />);

    expect(toJSON()).toMatchSnapshot();
  });
});
