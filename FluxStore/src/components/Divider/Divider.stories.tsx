import {Meta, StoryObj} from '@storybook/react';

import {colors} from '@/themes';
import Divider from '.';

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
};

export default meta;

type Story = StoryObj<typeof Divider>;

export const Default: Story = {
  args: {},
};

export const Height: Story = {
  args: {
    height: 5,
    color: colors.green[500],
  },
};
