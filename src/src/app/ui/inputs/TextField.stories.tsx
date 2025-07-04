import type { Meta, StoryObj } from '@storybook/react';
import { TextField } from './TextField';

const meta = {
  title: 'UI/Inputs/TextField',
  component: TextField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number'],
    },
    onChange: { action: 'changed' },
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'テキスト入力',
    dataName: 'text-input',
    type: 'text',
    value: '',
  },
};

export const Email: Story = {
  args: {
    label: 'メールアドレス',
    dataName: 'email',
    type: 'email',
    value: '',
  },
};

export const Password: Story = {
  args: {
    label: 'パスワード',
    dataName: 'password',
    type: 'password',
    value: '',
  },
};

export const WithValue: Story = {
  args: {
    label: '名前',
    dataName: 'name',
    type: 'text',
    value: '山田太郎',
  },
};

export const Number: Story = {
  args: {
    label: '年齢',
    dataName: 'age',
    type: 'number',
    value: '',
  },
};