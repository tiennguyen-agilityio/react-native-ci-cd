import {Meta, StoryObj} from '@storybook/react';

import Button from '.';
import {Alert} from 'react-native';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    text: 'Click me!',
    onPress: () => Alert.alert('Notifications'),
  },
};

export const Outlined: Story = {
  args: {
    text: 'Click me!',
    variant: 'outlined',
    onPress: () => Alert.alert('Notifications'),
  },
};

export const Ghost: Story = {
  args: {
    text: 'Click me!',
    variant: 'ghost',
    onPress: () => Alert.alert('Notifications'),
  },
};

export const small: Story = {
  args: {
    text: 'Click me!',
    size: 'sm',
    onPress: () => Alert.alert('Notifications'),
  },
};
