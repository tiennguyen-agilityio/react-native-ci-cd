import {Meta, StoryObj} from '@storybook/react';

import {REVIEWS} from '@/mocks';

import ReviewCard from '.';

const meta: Meta<typeof ReviewCard> = {
  title: 'Components/ReviewCard',
  component: ReviewCard,
};

export default meta;

type Story = StoryObj<typeof ReviewCard>;

export const Default: Story = {
  args: {
    avatarUrl: REVIEWS[0].avatarUrl,
    name: REVIEWS[0].name,
    rating: REVIEWS[0].rating,
    comment: REVIEWS[0].comment,
    createdAt: REVIEWS[0].createdAt,
  },
};
