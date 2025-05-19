import {Meta, StoryObj} from '@storybook/react';

import Collapse from '.';
import Text from '../Text';

const meta: Meta<typeof Collapse> = {
  title: 'Components/Collapse',
  component: Collapse,
};

export default meta;

type Story = StoryObj<typeof Collapse>;

export const Default: Story = {
  args: {
    label: 'My label',
    children: <Text>Lorem10</Text>,
  },
};
