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
    const maxVisiblePages = 5;
    const safeTotalPages = totalPages || 3; // Fallback for testing
    
    if (safeTotalPages <= maxVisiblePages) {
      for (let i = 1; i <= safeTotalPages; i++) {
        pages.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(safeTotalPages, startPage + maxVisiblePages - 1);
      
      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) {
          pages.push('...');
        }
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      if (endPage < safeTotalPages) {
        if (endPage < safeTotalPages - 1) {
          pages.push('...');
        }
        pages.push(safeTotalPages);
      }
    }
    
    return pages;
  };

  const handlePageClick = (page) => {
    if (page !== '...' && page !== currentPage && !isLoading) {
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
    </div>
  );
};

export default RecipePagination;
