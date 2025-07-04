import type { Meta, StoryObj } from '@storybook/react';
import { Title } from './Title';

const meta = {
  title: 'UI/Utils/Title',
  component: Title,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'text' },
    },
  },
} satisfies Meta<typeof Title>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 'ページタイトル',
  },
};

export const LoginTitle: Story = {
  args: {
    value: 'ログイン',
  },
};

export const BookListTitle: Story = {
  args: {
    value: '書籍一覧',
  },
};

export const RegisterTitle: Story = {
  args: {
    value: 'ユーザー登録',
  },
};

export const LongTitle: Story = {
  args: {
    value: 'とても長いタイトルの例：書籍管理システムへようこそ',
  },
};