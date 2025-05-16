import {Meta, StoryObj} from '@storybook/react';

import Rating from '.';

const meta: Meta<typeof Rating> = {
  title: 'Components/Rating',
  component: Rating,
};

export default meta;

type Story = StoryObj<typeof Rating>;

export const Default: Story = {
  args: {
    value: 0,
  },
};

export const Primary: Story = {
  args: {
    value: 5,
    size: 20,
  },
};

export const Secondary: Story = {
  args: {
    value: 3,
    size: 20,
  },
};
