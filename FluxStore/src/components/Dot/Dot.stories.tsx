import {Meta, StoryObj} from '@storybook/react';

import {COLORS} from '@/mocks';

import Dot from '.';
import {useState} from 'react';

const meta: Meta<typeof Dot> = {
  title: 'Components/Dot',
  component: Dot,
};

export default meta;

type Story = StoryObj<typeof Dot>;

const defaultProps = {
  color: COLORS[0],
  hasBorder: false,
  size: 34,
};

const Render = (props: {hasBorder?: boolean}) => {
  const [isShowBorder, setIsShowBorder] = useState(false);
  const handleChange = () => setIsShowBorder(prev => !prev);

  return <Dot {...defaultProps} hasBorder={isShowBorder} onSelect={handleChange} {...props} />;
};

export const Default: Story = {
  render: Render,
};

export const HasBorder: Story = {
  render: () => Render({hasBorder: true}),
};
