import {Meta, StoryObj} from '@storybook/react';

import ColorPicker from '.';
import {COLORS} from '@/mocks';
import {Alert} from 'react-native';

const meta: Meta<typeof ColorPicker> = {
  title: 'Components/ColorPicker',
  component: ColorPicker,
};

export default meta;

type Story = StoryObj<typeof ColorPicker>;

const defaultProps = {
  colors: COLORS,
  defaultValue: COLORS[0],
  onValueChange: (color: string) => Alert.alert('Current colors', color),
};

export const Default: Story = {
  args: defaultProps,
};
