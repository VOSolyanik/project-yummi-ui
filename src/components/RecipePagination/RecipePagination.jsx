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
    
    // If no recipes or totalPages is 0, show only page 1
    if (!totalPages || totalPages === 0) {
      return [1];
    }
    
    // Show all page numbers without ellipsis
    for (let i = 1; i <= totalPages; i++) {
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
  
  // When no recipes, always show page 1 as active
  const activePage = (!totalPages || totalPages === 0) ? 1 : currentPage;

  return (
    <div className={css.pagination}>
      <div className={css.pageNumbers}>
        {pageNumbers.map((page, index) => (
          <button
            key={index}
            type="button"
            className={`${css.pageButton} ${
              page === activePage ? css.active : ''
            }`}
            onClick={() => handlePageClick(page)}
            disabled={isLoading}
            aria-label={`Go to page ${page}`}
            aria-current={page === activePage ? 'page' : undefined}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecipePagination;
