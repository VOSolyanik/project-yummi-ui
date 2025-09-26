import React from 'react';

import css from './CategoryList.module.css';

import CategoryCard from '@components/CategoryCard/CategoryCard';

const WIDE_CATEGORIES = ['Desserts', 'Lamb', 'Pork', 'Side', 'Vegan'];
const MAX_DISPLAY_CATEGORIES = 11;

const CategoryList = ({ categories, onCategoryClick, isLoading, error }) => {
  const getCardSize = (categoryName) => {
    return WIDE_CATEGORIES.includes(categoryName) ? 'wide' : 'normal';
  };

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

  const displayCategories = categories.slice(0, MAX_DISPLAY_CATEGORIES);

  return (
    <div className={css.grid}>
      {displayCategories.map((category) => (
        <CategoryCard
          key={category._id}
          category={category}
          onClick={onCategoryClick}
          size={getCardSize(category.name)}
        />
      ))}
      
      <CategoryCard
        isAllCategories={true}
        onClick={() => onCategoryClick({ _id: 'all', name: 'All Categories' })}
        size="normal"
      />
    </div>
  );
};

export default CategoryList;
