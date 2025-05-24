"use client";

import { ReactElement, useState } from 'react';
import { BorrowingModal } from './BorrowingModal';

interface Book {
  imageUrl: string;
  title: string;
  loanable: boolean;
}

interface BookCardProps extends Book {}

function BookCard({ imageUrl, title, loanable }: BookCardProps): ReactElement {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBorrowClick = () => {
    if (loanable) {
      setIsModalOpen(true);
    }
  };

  return (
    <div className='border border-bd rounded-lg'>
      <div className="group relative aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-t-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 rounded-lg">
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

export const BookList: React.FC = () => {
  const books: Book[] = [
    {
      imageUrl:
        'https://www.oreilly.co.jp/books/images/picture_large978-4-87311-565-8.jpeg',
      title: 'リーダブルコード',
      loanable: false
    },
    {
      imageUrl:
        'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
      title: 'Nomad Tumbler',
      loanable: true
    },
    {
      imageUrl:
        'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
      title: 'Focus Paper Refill',
      loanable: true
    },
    {
      imageUrl:
        'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
      title: 'Machined Mechanical Pencil',
      loanable: true
    }
  ];

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-8">
          {books.map((book, index) => (
            <BookCard key={index} {...book} />
          ))}
        </div>
      </div>
    </div>
  );
}
