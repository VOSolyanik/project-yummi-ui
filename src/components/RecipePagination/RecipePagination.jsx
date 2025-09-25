import React from 'react';

import css from './RecipePagination.module.css';

const RecipePagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  isLoading 
}) => {
  if (totalPages <= 1) {
    return null;
  }

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      
      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) {
          pages.push('...');
        }
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pages.push('...');
        }
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  const handlePageClick = (page) => {
    if (page !== '...' && page !== currentPage && !isLoading) {
      onPageChange(page);
    }
  };

  const handlePreviousClick = () => {
    if (currentPage > 1 && !isLoading) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages && !isLoading) {
      onPageChange(currentPage + 1);
    }
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className={css.pagination}>
      <button
        type="button"
        className={`${css.pageButton} ${css.prevButton}`}
        onClick={handlePreviousClick}
        disabled={currentPage === 1 || isLoading}
        aria-label="Previous page"
      >
        ←
      </button>

      <div className={css.pageNumbers}>
        {pageNumbers.map((page, index) => (
          <button
            key={index}
            type="button"
            className={`${css.pageButton} ${
              page === currentPage ? css.active : ''
            } ${page === '...' ? css.ellipsis : ''}`}
            onClick={() => handlePageClick(page)}
            disabled={isLoading}
            aria-label={page === '...' ? 'More pages' : `Go to page ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        type="button"
        className={`${css.pageButton} ${css.nextButton}`}
        onClick={handleNextClick}
        disabled={currentPage === totalPages || isLoading}
        aria-label="Next page"
      >
        →
      </button>
    </div>
  );
};

export default RecipePagination;
