import React from 'react';

import css from './RecipePagination.module.css';

const RecipePagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  isLoading 
}) => {
  // For testing purposes, always show pagination
  // if (totalPages <= 1) {
  //   return null;
  // }

  const getPageNumbers = () => {
    const pages = [];
    const safeTotalPages = totalPages || 3; // Fallback for testing
    
    // Always show all page numbers without ellipsis
    for (let i = 1; i <= safeTotalPages; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  const handlePageClick = (page) => {
    if (page !== currentPage && !isLoading) {
      onPageChange(page);
    }
  };


  const pageNumbers = getPageNumbers();

  return (
    <div className={css.pagination}>
      <div className={css.pageNumbers}>
        {pageNumbers.map((page, index) => (
          <button
            key={index}
            type="button"
            className={`${css.pageButton} ${
              page === currentPage ? css.active : ''
            }`}
            onClick={() => handlePageClick(page)}
            disabled={isLoading}
            aria-label={`Go to page ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecipePagination;
