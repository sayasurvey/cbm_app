'use client';

type FooterProps = {
  className?: string;
};

export const Footer = ({ 
  className = '',
}: FooterProps) => {
  return (
    <footer className={`bg-gray-800 p-4 text-white ${className}`}>
      <div className="container mx-auto">
        <p className="text-center">
          &copy; 2025 Runteq_sayaka
        </p>
      </div>
    </footer>
  );
};
