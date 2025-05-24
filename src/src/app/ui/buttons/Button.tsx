'use client';

type ButtonProps = {
  value: string;
  type: 'submit' | 'button' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

export const Button = ({ 
  value, 
  type, 
  onClick, 
  disabled = false,
  className = ''
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        flex w-full justify-center rounded-md 
        bg-gray-600 px-3 py-1.5 text-sm font-semibold 
        leading-6 text-white shadow-sm 
        hover:bg-gray-500 
        focus-visible:outline focus-visible:outline-2 
        focus-visible:outline-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {value}
    </button>
  );
};
