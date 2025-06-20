import {Meta, StoryObj} from '@storybook/react';

import {RenderChildren} from '@/utils';

import Flex from '.';
import {FlexOptions} from '@/interfaces';

const meta: Meta<typeof Flex> = {
  title: 'Components/Flex',
  component: Flex,
};

export default meta;

type Story = StoryObj<typeof Flex>;

const defaultProps = {
  gap: 5,
};

const Render = (props: FlexOptions) => {
  return (
    <Flex {...defaultProps} {...props}>
      <RenderChildren />
    </Flex>
  );
};

export const Default: Story = {
  render: Render,
};

export const Row: Story = {
  render: () => Render({direction: 'row'}),
};
