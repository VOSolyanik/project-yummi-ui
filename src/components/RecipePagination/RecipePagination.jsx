import React, { useMemo, useCallback } from 'react';

import css from './RecipePagination.module.css';

const RecipePagination = ({
  currentPage,
  totalPages,
  onPageChange,
  isLoading
}) => {
  const pageNumbers = useMemo(() => {
    if (!totalPages || totalPages < 2) {
      return [];
    }

    const window = 3;
    const current = currentPage || 1;

    if (totalPages <= window) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const half = Math.floor(window / 2);
    let start = Math.max(1, current - half);
    let end = start + window - 1;

    if (end > totalPages) {
      end = totalPages;
      start = end - window + 1;
    }

    const core = Array.from({ length: end - start + 1 }, (_, i) => start + i);
    const tokens = [];

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
  }, [totalPages, currentPage]);

  const handlePageClick = useCallback((page) => {
    const current = currentPage || 1;
    if (page !== current && !isLoading) {
      onPageChange(page);
    }
  }, [currentPage, isLoading, onPageChange]);

  const activePage = (!totalPages || totalPages === 0) ? 1 : currentPage;
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
