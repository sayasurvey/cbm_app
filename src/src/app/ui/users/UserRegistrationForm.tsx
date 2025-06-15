"use client";

import { useState } from 'react';
import { Button } from '../buttons/Button';
import { TextField } from '../inputs/TextField';
import { fetcher } from '../../../../lib/utils';
import { useRouter } from 'next/navigation';

interface UserFormData {
  name: string;
  password: string;
  email: string;
}

export const UserRegistrationForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<UserFormData>({
    name: '',
    password: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetcher('api/users/register', {
        method: 'POST',
        body: JSON.stringify(formData),
      });

      alert('ユーザの登録が完了しました');
      router.push('/login');
    } catch (error) {
      console.error('ユーザ登録に失敗しました:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-600">
            ユーザ登録
          </h2>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <TextField
              label="ユーザ名"
              dataName="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <TextField
              label="メールアドレス"
              dataName="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <TextField
              label="パスワード"
              dataName="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <div className="mt-2">
              <Button 
                value={isSubmitting ? '登録中...' : '登録'} 
                type="submit"
                disabled={isSubmitting}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
