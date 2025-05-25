"use client";

import { useState, useEffect } from 'react';
import { fetcher } from '../../../../lib/utils';
import { BookCard } from './BookCard';

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
    image_url: string;
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

const PER_PAGE = 1;

export const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data: BooksResponse = await fetcher(`api/books?page=${currentPage}&perPage=${PER_PAGE}`);
        const formattedData = data.books.map((book) => ({
          ...book,
          imageUrl: book.image_url
        }));
        setBooks(formattedData);
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
            <BookCard key={book.id} {...book} />
          ))}
        </div>
        
        <div className="mt-8 flex justify-center">
          <ul className="Pagination">
            <li className="Pagination-Item">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="Pagination-Item-Link"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="Pagination-Item-Link-Icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                </svg>
              </button>
            </li>
            
            {Array.from({ length: lastPage }, (_, i) => i + 1).map((page) => (
              <li key={page} className="Pagination-Item">
                <button
                  onClick={() => handlePageChange(page)}
                  className={`Pagination-Item-Link ${currentPage === page ? 'isActive' : ''}`}
                >
                  <span>{page}</span>
                </button>
              </li>
            ))}
            
            <li className="Pagination-Item">
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === lastPage}
                className="Pagination-Item-Link"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="Pagination-Item-Link-Icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
