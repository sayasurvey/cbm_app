"use client";

import { ReactElement, useState } from 'react';
import { BorrowingModal } from './BorrowingModal';

interface Book {
  imageUrl: string;
  title: string;
  loanable: boolean;
}

interface BookCardProps extends Book {}

export function BookCard({ imageUrl, title, loanable }: BookCardProps): ReactElement {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBorrowClick = () => {
    if (loanable) {
      setIsModalOpen(true);
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
        </div>
      </div>
      <div className='flex rounded-lg'>
        <p onClick={handleBorrowClick} className={`py-1 w-full text-center border-r border-bd cursor-pointer ${loanable ? '' : 'text-gray-400 cursor-not-allowed'}`}>借りる</p>
        <p className="py-1 w-full text-center">借りたい</p>
      </div>
      <BorrowingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
