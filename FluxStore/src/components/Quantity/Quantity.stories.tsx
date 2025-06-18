import {Alert} from 'react-native';
import {Meta, StoryObj} from '@storybook/react';

import Quantity from '.';

const meta: Meta<typeof Quantity> = {
  title: 'Components/Quantity',
  component: Quantity,
};

export default meta;

type Story = StoryObj<typeof Quantity>;

export const Default: Story = {
  args: {
    onChangeValue: (value: number) => Alert.alert('Quantity', `Current value: ${value}`),
  },
};

export const Max: Story = {
  args: {
    max: 5,
    onChangeValue: () => {},
  },
};
