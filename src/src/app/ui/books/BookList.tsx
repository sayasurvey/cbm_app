"use client";

import { useState, useEffect } from 'react';
import { fetcher } from '../../../../lib/utils';
import { BookCard } from './BookCard';

interface Book {
  imageUrl: string;
  title: string;
  loanable: boolean;
}

export const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await fetcher('api/books');
        const formattedData = data.map((book: any) => ({
          ...book,
          imageUrl: book.image_url
        }));
        setBooks(formattedData);
      } catch (err) {
        console.error('Error fetching books:', err);
        setError(err instanceof Error ? err.message : '予期せぬエラーが発生しました');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

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
