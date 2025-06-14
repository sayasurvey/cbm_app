"use client";

import { useState, useEffect, useCallback } from 'react';
import { fetcher } from '../../../../../lib/utils';
import { BookActionCard } from '../BookActionCard';
import { Pagination } from '../../utils/Pagination';
import { PER_PAGE } from '../../../../constants/utils';

interface Book {
  id: number;
  imageUrl: string;
  title: string;
}

interface WishListResponse {
  wishList: Book[];
  currentPage: number;
  lastPage: number;
  perPage: number;
}

export const WishList: React.FC = () => {
  const [wishList, setWishList] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const fetchWishList = useCallback(async () => {
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        perPage: PER_PAGE.toString()
      });

      const data: WishListResponse = await fetcher(`api/books/wish-list?${params.toString()}`);

      if (data && data.wishList) {
        setWishList(data.wishList);
        setLastPage(data.lastPage);
      } else {
        console.error('APIレスポンスの形式が不正です:', data);
        setError('データの取得に失敗しました');
      }
    } catch (err) {
      console.error('借りたい本リストの取得に失敗しました:', err);
      setError(err instanceof Error ? err.message : '予期せぬエラーが発生しました');
    } finally {
      setIsLoading(false);
    }
  }, [currentPage]);

  const handleRemoveFromWishList = async (bookId: number) => {
    try {
      await fetcher(`api/books/wish-list/${bookId}`, {
        method: 'DELETE'
      });
      alert('借りたい本リストから削除しました');
      fetchWishList();
    } catch (error) {
      console.error('借りたい本リストからの削除に失敗しました:', error);
      alert('借りたい本リストからの削除に失敗しました');
    }
  };

  useEffect(() => {
    fetchWishList();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) return <div>読み込み中...</div>;
  if (error) return <div>エラーが発生しました: {error}</div>;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-8 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-8">
          {wishList && wishList.length > 0 ? (
            wishList.map((book) => (
              <BookActionCard 
                key={book.id} 
                {...book}
                buttonText="登録解除"
                onButtonClick={() => handleRemoveFromWishList(book.id)}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              借りたい本リストに登録されている本はありません
            </div>
          )}
        </div>
        
        {wishList && wishList.length > 0 && (
          <div className="mt-8 flex justify-center">
            <Pagination
              currentPage={currentPage}
              lastPage={lastPage}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};
