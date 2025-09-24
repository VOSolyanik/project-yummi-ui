import React from 'react';

import css from './CategoryList.module.css';

import CategoryCard from '@components/CategoryCard/CategoryCard';

const CategoryList = ({ categories, onCategoryClick, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className={css.loading}>
        <div className={css.loadingSpinner}></div>
        <p>Loading categories...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={css.error}>
        <p>Error loading categories: {error}</p>
      </div>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <div className={css.empty}>
        <p>No categories found.</p>
      </div>
    );
  }

  // Беремо перші 12 категорій для сітки
  const displayCategories = categories.slice(0, 12);

  return (
    <div className={css.grid}>
      {displayCategories.map((category) => (
        <CategoryCard
          key={category._id}
          category={category}
          onClick={onCategoryClick}
        />
      ))}
      
      {/* Картка "ALL CATEGORIES" */}
      <CategoryCard
        isAllCategories={true}
        onClick={() => onCategoryClick({ _id: 'all', name: 'All Categories' })}
      />
    </div>
  );
};

export default CategoryList;
