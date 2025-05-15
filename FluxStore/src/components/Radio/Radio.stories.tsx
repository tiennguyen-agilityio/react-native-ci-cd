import {useState} from 'react';
import {Meta, StoryObj} from '@storybook/react';

import Radio from '.';

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
};

export default meta;

type Story = StoryObj<typeof Radio>;

const Render = (props: {size?: number; borderWidth?: number}) => {
  const [selected, setSelected] = useState(false);
  const handleChange = () => setSelected(prev => !prev);
  return <Radio selected={selected} onPress={handleChange} {...props} />;
};

export const Default: Story = {
  render: Render,
};

export const Large: Story = {
  render: () => <Render size={30} borderWidth={10} />,
};
