import {Meta, StoryObj} from '@storybook/react';

import Collapse from '.';
import Text from '../Text';

const meta: Meta<typeof Collapse> = {
  title: 'Components/Collapse',
  component: Collapse,
};

export default meta;

type Story = StoryObj<typeof Collapse>;

const defaultProps = {
  label: 'My label',
};

const Render = () => {
  return (
    <Collapse {...defaultProps}>
      <Text>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque, quae!</Text>
    </Collapse>
  );
};

export const Default: Story = {
  render: Render,
};
