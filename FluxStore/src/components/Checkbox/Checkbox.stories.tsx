import {useState} from 'react';
import {Meta, StoryObj} from '@storybook/react';

import Checkbox, {CheckboxProps} from '.';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

type RenderProps = Omit<CheckboxProps, 'onValueChange'>;

const Render = ({selected, ...props}: RenderProps) => {
  const [isChecked, setIsChecked] = useState(selected);
  const handleChange = () => setIsChecked(prev => !prev);
  return <Checkbox selected={isChecked} onValueChange={handleChange} {...props} />;
};

export const Default: Story = {
  render: Render,
};

export const Checked: Story = {
  render: () => <Render selected label="Label checkbox" />,
};

export const Disabled: Story = {
  render: () => <Render disabled label="Label checkbox" />,
};

export const DisabledChecked: Story = {
  render: () => <Render disabled selected label="Label checkbox" />,
};
