import { useState, useEffect } from 'react';
import { fetcher } from '../lib/utils';

type User = {
  id: string;
  email: string;
  name: string;
};

type AuthState = {
  isLoggedIn: boolean;
  user: User | null;
};

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isLoggedIn: false,
    user: null,
  });

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setAuthState({
          isLoggedIn: true,
          user,
        });
      } catch (error) {
        console.error('ユーザー情報の解析に失敗しました:', error);
        logout();
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const data = await fetcher('api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      const expires = new Date();
      expires.setDate(expires.getDate() + 7);
      document.cookie = `token=${data.token}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;

      localStorage.setItem('user', JSON.stringify(data.user));
      
      setAuthState({
        isLoggedIn: true,
        user: data.user,
      });

      return { success: true };
    } catch (error) {
      console.error('ログインエラー:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'ログインに失敗しました' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setAuthState({
      isLoggedIn: false,
      user: null,
    });
  };

  return {
    isLoggedIn: authState.isLoggedIn,
    user: authState.user,
    login,
    logout,
  };
};
