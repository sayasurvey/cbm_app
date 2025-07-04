import type { Meta, StoryObj } from '@storybook/react';
import { BookCard } from './BookCard';

const meta = {
  title: 'UI/Books/BookCard',
  component: BookCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    loanable: {
      control: { type: 'boolean' },
    },
    isWishList: {
      control: { type: 'boolean' },
    },
    onBorrowSuccess: { action: 'borrow success' },
  },
} satisfies Meta<typeof BookCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: 1,
    imageUrl: 'https://via.placeholder.com/300x400/4A5568/FFFFFF?text=Sample+Book',
    title: 'サンプル書籍',
    loanable: true,
    isWishList: false,
  },
};

export const NotLoanable: Story = {
  args: {
    id: 2,
    imageUrl: 'https://via.placeholder.com/300x400/E53E3E/FFFFFF?text=Unavailable',
    title: '貸出不可の書籍',
    loanable: false,
    isWishList: false,
  },
};

export const InWishList: Story = {
  args: {
    id: 3,
    imageUrl: 'https://via.placeholder.com/300x400/38A169/FFFFFF?text=Wish+List',
    title: 'ウィッシュリスト登録済み',
    loanable: true,
    isWishList: true,
  },
};

export const UnavailableInWishList: Story = {
  args: {
    id: 4,
    imageUrl: 'https://via.placeholder.com/300x400/D69E2E/FFFFFF?text=Wish+Unavailable',
    title: 'ウィッシュリスト登録済み（貸出不可）',
    loanable: false,
    isWishList: true,
  },
};

export const LongTitle: Story = {
  args: {
    id: 5,
    imageUrl: 'https://via.placeholder.com/300x400/805AD5/FFFFFF?text=Long+Title',
    title: 'とても長いタイトルの書籍：プログラミングの基礎から応用まで完全マスター',
    loanable: true,
    isWishList: false,
  },
};