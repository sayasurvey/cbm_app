"use client";

import { useState, useEffect } from 'react';
import { fetcher } from '../../../../../lib/utils';
import { BookActionCard } from '../BookActionCard';

interface Book {
  id: number;
  imageUrl: string;
  title: string;
}

interface WishListResponse {
  wish_list: Book[];
}

export const WishList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBooks = async () => {
    try {
      const data: WishListResponse = await fetcher('api/books/wish-list');
      setBooks(data.wish_list);
    } catch (err) {
      console.error('借りたい本一覧の取得に失敗しました:', err);
      setError(err instanceof Error ? err.message : '予期せぬエラーが発生しました');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFromWishList = async (bookId: number) => {
    try {
      await fetcher(`api/books/wish-list/${bookId}`, {
        method: 'DELETE'
      });
      alert('読みたい本リストから削除しました');
      fetchBooks();
    } catch (error) {
      console.error('読みたい本リストからの削除に失敗しました:', error);
      alert('読みたい本リストからの削除に失敗しました');
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600">読み込み中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-8">
          {books.map((book) => (
            <BookActionCard 
              key={book.id} 
              {...book}
              buttonText="登録解除"
              onButtonClick={() => handleRemoveFromWishList(book.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
