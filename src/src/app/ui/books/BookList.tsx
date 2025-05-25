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
          <nav className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded border border-bd disabled:opacity-50 disabled:cursor-not-allowed"
            >
              前へ
            </button>
            
            {Array.from({ length: lastPage }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded border ${
                  currentPage === page
                    ? 'bg-primary text-white border-primary'
                    : 'border-bd hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === lastPage}
              className="px-3 py-1 rounded border border-bd disabled:opacity-50 disabled:cursor-not-allowed"
            >
              次へ
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
