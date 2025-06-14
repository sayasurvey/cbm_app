"use client";

import { useState, useEffect, useCallback } from 'react';
import { fetcher } from '../../../../lib/utils';
import { BookCard } from './BookCard';
import { Pagination } from '../utils/Pagination';
import { PER_PAGE } from '../../../constants/utils';

interface Book {
  id: number;
  imageUrl: string;
  title: string;
  loanable: boolean;
  isWishList: boolean;
  user: {
    id: number;
    name: string;
  };
}

interface BooksResponse {
  books: Book[]
  currentPage: number;
  lastPage: number;
  perPage: number;
}

export const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const fetchBooks = useCallback(async () => {
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        perPage: PER_PAGE.toString()
      });

      const data: BooksResponse = await fetcher(`api/books?${params.toString()}`);
      setBooks(data.books);
      setLastPage(data.lastPage);
    } catch (err) {
      console.error('本一覧の取得に失敗しました:', err);
    }
  }, [currentPage]);

  useEffect(() => {
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
            <BookCard 
              key={book.id} 
              {...book}
              onBorrowSuccess={fetchBooks}
            />
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
