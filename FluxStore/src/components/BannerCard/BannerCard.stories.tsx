import {Meta, StoryObj} from '@storybook/react';

import BannerCard from '.';
import {BANNERS} from '@/mocks';

const meta: Meta<typeof BannerCard> = {
  title: 'Components/BannerCard',
  component: BannerCard,
};

export default meta;

type Story = StoryObj<typeof BannerCard>;

const propsDefault = {
  title: BANNERS[1].title,
  imageUrl: BANNERS[1].imageUrl,
};

export const Default: Story = {
  args: propsDefault,
};
