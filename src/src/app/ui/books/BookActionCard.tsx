"use client";

import { ReactElement } from 'react';

interface Book {
  imageUrl: string;
  title: string;
  checkoutDate?: string;
  returnDueDate?: string;
}

interface BookActionCardProps extends Book {
  buttonText: string;
  onButtonClick: () => void;
}

export function BookActionCard({ imageUrl, title, checkoutDate, returnDueDate, buttonText, onButtonClick }: BookActionCardProps): ReactElement {
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
          {checkoutDate && (
            <>
              <p>貸出日:</p>
              <p>　{checkoutDate}</p>
            </>
          )}
          {returnDueDate && (
            <>
              <p>返却予定日:</p>
              <p>　{returnDueDate}</p>
            </>
          )}
        </div>
      </div>
      <div className='flex rounded-lg'>
        <p onClick={onButtonClick} className="py-1 w-full text-center cursor-pointer">{buttonText}</p>
      </div>
    </div>
  );
}
