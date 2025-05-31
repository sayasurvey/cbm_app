"use client";

import { ReactElement, useState } from 'react';
import { fetcher } from '../../../../../lib/utils';

interface BorrowedBook {
  id: number;
  imageUrl: string;
  title: string;
  checkoutDate: string;
  returnDueDate: string;
}

interface BookCardProps extends BorrowedBook {
  onReturnSuccess: () => void;
}

export function BorrowedBookCard({ id, imageUrl, title, checkoutDate, returnDueDate, onReturnSuccess }: BookCardProps): ReactElement {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleReturnClick = async () => {
    const isConfirmed = window.confirm('本の返却が完了しましたか？');
    
    if (isConfirmed) {
      try {
        await fetcher('api/books/return', {
          method: 'POST',
          body: JSON.stringify({
            'borrowedBookId': id
          }),
        });

        onReturnSuccess();
        alert('返却処理が完了しました。');
      } catch (error) {
        console.error('返却処理中にエラーが発生しました:', error);
        alert('返却処理中にエラーが発生しました。');
      }
    }
  };

  return (
    <div className='border border-bd rounded-lg'>
      <div className="group relative aspect-h-1 aspect-w-1 w-full overflow-hidden bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <img
          src={imageUrl}
          className="sm:h-full md:h-[25rem] lg:h-[20rem] xl:h-[20rem] w-full rounded-t-lg object-cover object-center group-hover:opacity-25"
        />
        <div className='absolute top-5 left-5 opacity-0 group-hover:opacity-100'>
          <p>タイトル:</p>
          <p>　{title}</p>
          <p>貸出日:</p>
          <p>　{checkoutDate}</p>
          <p>返却予定日:</p>
          <p>　{returnDueDate}</p>
        </div>
      </div>
      <div className='flex rounded-lg'>
        <p onClick={handleReturnClick} className={`py-1 w-full text-center border-r border-bd cursor-pointer`}>返却</p>
      </div>
    </div>
  );
}
