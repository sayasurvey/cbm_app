'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '../../../../hooks/useAuth';
import { deleteTokenCookie } from '../../../../lib/utils';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

      <nav className={`
        ${isMenuOpen ? 'block' : 'hidden'} 
        md:flex md:items-center
        absolute md:relative
        top-16 md:top-0
        left-0 right-0
        bg-gray-800 md:bg-transparent
        p-4 md:p-0
      `}>
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
