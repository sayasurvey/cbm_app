"use client";

import { BookActionCard } from '../BookActionCard';
import { fetcher } from '../../../../../lib/utils';

interface Book {
  id: number;
  imageUrl: string;
  title: string;
  checkoutDate: string;
  returnDueDate: string;
}

interface BorrowedBookCardProps extends Book {
  onReturnSuccess: () => void;
}

export const BorrowedBookCard: React.FC<BorrowedBookCardProps> = ({
  id,
  imageUrl,
  title,
  checkoutDate,
  returnDueDate,
  onReturnSuccess
}) => {
  const handleReturn = async () => {
    const isConfirmed = window.confirm('本の返却が完了しましたか？');
    
    if (!isConfirmed) {
      return;
    }

    try {
      await fetcher('api/books/return', {
        method: 'POST',
        body: JSON.stringify({
          'borrowedBookId': id
        }),
      });

      alert('返却処理が完了しました。');
      onReturnSuccess();
    } catch (error) {
      console.error('返却処理中にエラーが発生しました:', error);
      alert('返却処理中にエラーが発生しました。');
    }
  };

  return (
    <BookActionCard
      imageUrl={imageUrl}
      title={title}
      checkoutDate={checkoutDate}
      returnDueDate={returnDueDate}
      buttonText="返却する"
      onButtonClick={handleReturn}
    />
  );
};
