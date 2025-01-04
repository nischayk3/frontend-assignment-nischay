import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  handleNextPage,
  handlePreviousPage,
}) => {
  return (
    <div className='pagiantion'>
      <button onClick={handlePreviousPage} disabled={currentPage === 1} aria-label="Previous Page">
        Previous
      </button>
      <span>Page {currentPage} of {totalPages}</span>
      <button onClick={handleNextPage} disabled={currentPage === totalPages} aria-label="Next Page">
        Next
      </button>
    </div>
  );
};

export default Pagination;