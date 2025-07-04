import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  title: 'UI/Buttons/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['submit', 'button', 'reset'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 'ボタン',
    type: 'button',
    disabled: false,
  },
};

export const Submit: Story = {
  args: {
    value: '送信',
    type: 'submit',
    disabled: false,
  },
};

export const Reset: Story = {
  args: {
    value: 'リセット',
    type: 'reset',
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    value: '無効なボタン',
    type: 'button',
    disabled: true,
  },
};

export const CustomClassName: Story = {
  args: {
    value: 'カスタムスタイル',
    type: 'button',
    className: 'bg-blue-600 hover:bg-blue-500',
  },
};