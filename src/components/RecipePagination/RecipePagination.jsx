import React from 'react';

import css from './RecipePagination.module.css';

const RecipePagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  isLoading,
  totalRecipes 
}) => {
  // Don't show pagination if no recipes found
  if (!totalRecipes || totalRecipes === 0) {
    return null;
  }

  const getPageNumbers = () => {
    // If no recipes or totalPages is 0, show only page 1
    if (!totalPages || totalPages === 0) {
      return [1];
    }
    
    const window = 3;
    const current = currentPage || 1;
    
    // If 3 or fewer pages, show all
    if (totalPages <= window) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    // Calculate window of 3 pages centered around current
    const half = Math.floor(window / 2); // 1 for window=3
    let start = Math.max(1, current - half);
    let end = start + window - 1;
    
    if (end > totalPages) {
      end = totalPages;
      start = end - window + 1;
    }
    
    const core = Array.from({ length: end - start + 1 }, (_, i) => start + i);
    const tokens = [];
    
    // Add edges
    if (start > 1) {
      tokens.push(1);
      if (start > 2) {
        tokens.push('ellipsis');
      }
    }
    
    tokens.push(...core);
    
    if (end < totalPages) {
      if (end < totalPages - 1) {
        tokens.push('ellipsis');
      }
      tokens.push(totalPages);
    }
    
    return tokens;
  };

  const handlePageClick = (page) => {
    if (page !== currentPage && !isLoading) {
      onPageChange(page);
    }
  };

  const pageNumbers = getPageNumbers();
  
  // When no recipes, always show page 1 as active
  const activePage = (!totalPages || totalPages === 0) ? 1 : currentPage;
  
  // Navigation arrows logic
  const canPrev = activePage > 1;
  const canNext = activePage < totalPages;
  const showArrows = totalPages > 3;

  return (
    <nav className={css.pagination} aria-label="Pagination">
      {showArrows && (
        <button
          type="button"
          className={css.navButton}
          disabled={!canPrev || isLoading}
          onClick={() => handlePageClick(1)}
          aria-label="First page"
        >
          «
        </button>
      )}
      
      {showArrows && (
        <button
          type="button"
          className={css.navButton}
          disabled={!canPrev || isLoading}
          onClick={() => handlePageClick(activePage - 1)}
          aria-label="Previous page"
        >
          ‹
        </button>
      )}

      <div className={css.pageNumbers}>
        {pageNumbers.map((page, index) => (
          page === 'ellipsis' ? (
            <span key={`ellipsis-${index}`} className={css.ellipsis} aria-hidden="true">
              …
            </span>
          ) : (
            <button
              key={page}
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
          )
        ))}
      </div>

      {showArrows && (
        <button
          type="button"
          className={css.navButton}
          disabled={!canNext || isLoading}
          onClick={() => handlePageClick(activePage + 1)}
          aria-label="Next page"
        >
          ›
        </button>
      )}
      
      {showArrows && (
        <button
          type="button"
          className={css.navButton}
          disabled={!canNext || isLoading}
          onClick={() => handlePageClick(totalPages)}
          aria-label="Last page"
        >
          »
        </button>
      )}
    </nav>
  );
};

export default RecipePagination;
