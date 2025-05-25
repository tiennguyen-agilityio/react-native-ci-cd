import {Meta, StoryObj} from '@storybook/react';
import {Alert} from 'react-native';

import {SIZES} from '@/mocks';
import SizeSelect from '.';

const meta: Meta<typeof SizeSelect> = {
  title: 'Components/SizeSelect',
  component: SizeSelect,
};

export default meta;

type Story = StoryObj<typeof SizeSelect>;

const defaultProps = {
  sizes: SIZES,
  defaultValue: [SIZES[0]],
  onValueChange: (colors: string[]) => Alert.alert('Current sizes', colors.join(', ')),
};

export const Default: Story = {
  args: defaultProps,
};
