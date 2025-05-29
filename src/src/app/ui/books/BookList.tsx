"use client";

import { useState, useEffect } from 'react';
import { fetcher } from '../../../../lib/utils';
import { BookCard } from './BookCard';
import { Pagination } from '../utils/Pagination';

interface Book {
  id: number;
  imageUrl: string;
  title: string;
  loanable: boolean;
  user: {
    id: number;
    name: string;
  };
}

interface BooksResponse {
  books: Array<{
    id: number;
    title: string;
    imageUrl: string;
    loanable: boolean;
    user: {
      id: number;
      name: string;
    };
  }>;
  currentPage: number;
  lastPage: number;
  perPage: number;
}

const PER_PAGE = 50;

export const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const params = new URLSearchParams({
          page: currentPage.toString(),
          perPage: PER_PAGE.toString()
        });

        const data: BooksResponse = await fetcher(`api/books?${params.toString()}`);
        setBooks(data.books);
        setLastPage(data.lastPage);
      } catch (err) {
        console.error('Error fetching books:', err);
        setError(err instanceof Error ? err.message : '予期せぬエラーが発生しました');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-8">
          {books.map((book) => (
            <BookCard key={book.id} bookId={book.id} {...book} />
          ))}
        </div>
        
        <div className="mt-8 flex justify-center">
          <Pagination
            currentPage={currentPage}
            lastPage={lastPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
