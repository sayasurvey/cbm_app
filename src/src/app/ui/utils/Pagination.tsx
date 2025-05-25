"use client";

interface PaginationProps {
  currentPage: number;
  lastPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  lastPage,
  onPageChange,
}) => {
  return (
    <ul className="Pagination">
      <li className="Pagination-Item">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="Pagination-Item-Link"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="Pagination-Item-Link-Icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>
      </li>
      
      {Array.from({ length: lastPage }, (_, i) => i + 1).map((page) => (
        <li key={page} className="Pagination-Item">
          <button
            onClick={() => onPageChange(page)}
            className={`Pagination-Item-Link ${currentPage === page ? 'isActive' : ''}`}
          >
            <span>{page}</span>
          </button>
        </li>
      ))}
      
      <li className="Pagination-Item">
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === lastPage}
          className="Pagination-Item-Link"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="Pagination-Item-Link-Icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </button>
      </li>
    </ul>
  );
}; 