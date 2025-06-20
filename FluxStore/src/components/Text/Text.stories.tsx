import {Meta, StoryObj} from '@storybook/react';

import Text from '.';

const meta: Meta<typeof Text> = {
  title: 'Components/Text',
  component: Text,
};

export default meta;

type Story = StoryObj<typeof Text>;

const props = {
  children: 'Lorem ipsum dolor sit amet',
};

export const Default: Story = {
  args: props,
};

export const Heading: Story = {
  args: {
    ...props,
    variant: 'heading',
  },
};

export const Title: Story = {
  args: {
    ...props,
    variant: 'title',
  },
};

export const SubTitle: Story = {
  args: {
    ...props,
    variant: 'subTitle',
  },
};

export const Description: Story = {
  args: {
    ...props,
    variant: 'description',
  },
};
