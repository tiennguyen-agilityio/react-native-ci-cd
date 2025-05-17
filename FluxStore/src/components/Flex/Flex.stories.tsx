import {Meta, StoryObj} from '@storybook/react';

import {RenderChildren} from '@/utils';

import Flex from '.';

const meta: Meta<typeof Flex> = {
  title: 'Components/Flex',
  component: Flex,
};

export default meta;

type Story = StoryObj<typeof Flex>;

export const Default: Story = {
  args: {
    gap: 5,
    children: <RenderChildren />,
  },
};

export const Row: Story = {
  args: {
    gap: 5,
    direction: 'row',
    children: <RenderChildren />,
  },
};
