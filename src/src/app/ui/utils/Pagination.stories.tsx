import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './Pagination';

const meta = {
  title: 'UI/Utils/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    currentPage: {
      control: { type: 'number', min: 1 },
    },
    lastPage: {
      control: { type: 'number', min: 1 },
    },
    onPageChange: { action: 'page changed' },
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentPage: 1,
    lastPage: 5,
  },
};

export const MiddlePage: Story = {
  args: {
    currentPage: 3,
    lastPage: 10,
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 10,
    lastPage: 10,
  },
};

export const ManyPages: Story = {
  args: {
    currentPage: 5,
    lastPage: 20,
  },
};

export const SinglePage: Story = {
  args: {
    currentPage: 1,
    lastPage: 1,
  },
};
