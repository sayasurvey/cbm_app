'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '../ui/button/Button';
import { TextField } from '../ui/input/TextField';
import Layout from '../ui/layout/Layout';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || 'ログインに失敗しました');
      }
  
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      window.location.href = '/books';
    } catch (error) {
      console.error('ログインエラー:', error);
      setError(error instanceof Error ? error.message : 'ログインに失敗しました');
    }
  };

  return (
    <Layout>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-600">
              ログイン
            </h2>
          </div>
          {error && (
            <div className="mt-2 text-center text-sm text-red-600">
              {error}
            </div>
          )}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <TextField
                value="メールアドレス"
                dataName="email"
                onChange={handleChange}
              />
            </div>

            <div>
              <TextField
                value="パスワード"
                dataName="password"
                onChange={handleChange}
              />
            </div>

            <div>
              <div className="mt-6">
                <Button
                  value="ログイン"
                  type="submit"
                />
              </div>
            </div>
          </form>

          <p className="mt-3 text-center text-sm text-gray-500">
            <Link 
              href="/signup" 
              className="font-semibold leading-6 text-gray-600 hover:text-gray-500 transition-colors"
            >
              新規会員登録はこちら
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default LoginForm;
