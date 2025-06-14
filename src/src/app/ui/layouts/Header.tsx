'use client';

import Link from 'next/link';
import { useAuth } from '../../../../hooks/useAuth';
import { deleteTokenCookie } from '../../../../lib/utils';

export const Header = () => {
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    logout();
    deleteTokenCookie();
    window.location.href = '/login';
  };

  return (
    <header className={`bg-gray-800 p-4 text-white flex justify-between items-center z-50`}>
      <div>
        {isLoggedIn ? (
          <Link 
            href="/books" 
            className="text-2xl font-bold hover:text-gray-400 transition-colors"
          >
            Booking
          </Link>
        ) : (
          <span className="text-2xl font-bold">
            Booking
          </span>
        )}
      </div>

      <nav className="md:flex md:items-center">
        {isLoggedIn && (
          <>
            <div>
              <Link 
                href="/books" 
                className="block md:inline-block mr-3 hover:text-gray-400 transition-colors font-bold"
              >
                本の一覧
              </Link>
            </div>
            <div>
              <Link 
                href="/books/register" 
                className="block md:inline-block mr-3 hover:text-gray-400 transition-colors font-bold"
              >
                本の登録
              </Link>
            </div>
            <div>
              <Link 
                href="/books/borrowed" 
                className="block md:inline-block mr-3 hover:text-gray-400 transition-colors font-bold"
              >
                借りた本
              </Link>
            </div>
            <div>
              <Link 
                href="/books/wish-list" 
                className="block md:inline-block mr-3 hover:text-gray-400 transition-colors font-bold"
              >
                借りたい本
              </Link>
            </div>
          </>
        )}
        <div>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="block md:inline-block hover:text-gray-400 transition-colors font-bold"
            >
              ログアウト
            </button>
          ) : (
            <Link 
              href="/login" 
              className="block md:inline-block hover:text-gray-400 transition-colors font-bold"
            >
              ログイン
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};
