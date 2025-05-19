'use client';

import { ChangeEvent } from 'react';

type TextFieldProps = {
  value: string;
  dataName: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const TextField = ({ value, dataName, onChange }: TextFieldProps) => {
  return (
    <div>
      <label 
        htmlFor={dataName} 
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {value}
      </label>
      <input
        id={dataName}
        name={dataName}
        type={dataName}
        onChange={onChange}
        autoComplete="current-password"
        required
        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
      />
    </div>
  );
};
