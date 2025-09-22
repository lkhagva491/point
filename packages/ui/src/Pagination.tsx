import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center mt-4 space-x-2">
      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        className="btn btn-primary px-2 py-1 text-xs"
      >
        ‹
      </button>
      <span className="self-center text-gray-700 text-sm">
        {currentPage} / {totalPages}
      </span>
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className="btn btn-primary px-2 py-1 text-xs"
      >
        ›
      </button>
    </div>
  );
};

export default Pagination;
