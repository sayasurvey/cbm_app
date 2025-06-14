"use client";

import { ReactElement, useState } from 'react';
import { BorrowingModal } from './BorrowingModal';
import { fetcher } from '../../../../lib/utils';

interface Book {
  id: number;
  imageUrl: string;
  title: string;
  loanable: boolean;
  isWishList: boolean;
}

interface BookCardProps extends Book {
  onBorrowSuccess: () => void;
}

export function BookCard({ id, imageUrl, title, loanable, isWishList, onBorrowSuccess }: BookCardProps): ReactElement {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const wishListButtonText = isWishList ? '登録解除' : '借りたい';

  const handleBorrowClick = () => {
    if (loanable) {
      setIsModalOpen(true);
    }
  };

  const handleWishClick = async () => {
    try {
      if (isWishList) {
        await handleRemoveFromWishList();
      } else {
        await handleAddToWishList()
      }
      onBorrowSuccess();
    } catch (error) {
      console.error('借りたい本リストの操作に失敗しました:', error);
      alert('借りたい本リストの操作に失敗しました');
    }
  };

  const handleRemoveFromWishList = async () => {
    await fetcher(`api/books/wish-list/${id}`, {
      method: 'DELETE'
    });
    alert('借りたい本リストから削除しました');
  };

  const handleAddToWishList = async () => {
    await fetcher('api/books/wish-list', {
      method: 'POST',
      body: JSON.stringify({
        book_id: id
      })
    });
    alert('借りたい本リストに追加しました');
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
        </div>
      </div>
      <div className='flex rounded-lg'>
        <p
          onClick={handleBorrowClick}
          className={`py-1 w-full text-center border-r border-bd cursor-pointer ${loanable ? '' : 'text-gray-400 cursor-not-allowed'}`}
        >借りる</p>
        <p onClick={handleWishClick} className="py-1 w-full text-center cursor-pointer">{wishListButtonText}</p>
      </div>
      <BorrowingModal 
        isOpen={isModalOpen} 
        bookId={id}
        onClose={() => setIsModalOpen(false)} 
        onBorrowSuccess={onBorrowSuccess}
      />
    </div>
  );
}
