"use client";

import { useState } from 'react';
import { Button } from '../buttons/Button';
import { TextField } from '../inputs/TextField';
import { fetcher } from '../../../../lib/utils';
import { useRouter } from 'next/navigation';

interface BookFormData {
  title: string;
  imageUrl: string;
  loanable: boolean;
}

export const BookForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<BookFormData>({
    title: '',
    imageUrl: '',
    loanable: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleToggleLoanable = () => {
    setFormData(prev => ({
      ...prev,
      loanable: !prev.loanable
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetcher('api/books', {
        method: 'POST',
        body: JSON.stringify(formData),
      });

      router.push('/books');
    } catch (error) {
      console.error('本の登録に失敗しました:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-600">
            本の登録
          </h2>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <TextField
              label="本のタイトル"
              dataName="title"
              onChange={handleInputChange}
            />
          </div>

          <div>
            <TextField
              label="画像のURL"
              dataName="imageUrl"
              onChange={handleInputChange}
            />
          </div>

          {formData.imageUrl && (
            <div className="mt-4">
              <img
                src={formData.imageUrl}
                alt="Book Cover"
                className="mx-auto w-2/3 rounded-lg shadow-md"
                onError={(e) => {
                  e.currentTarget.src = '/images/no-image.png';
                }}
              />
            </div>
          )}

          <div className="flex items-center justify-center">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={formData.loanable}
                onChange={handleToggleLoanable}
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-600"></div>
              <span className="ml-3 text-sm font-medium text-gray-900">
                {formData.loanable ? '貸し出し可能' : '貸し出し不可'}
              </span>
            </label>
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
