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

  // Беремо перші 11 категорій для сітки (без Soup)
  const displayCategories = categories.slice(0, 11);

  // Визначаємо розмір кожної картки згідно з дизайном
  const getCardSize = (categoryName) => {
    // На десктопі: Desserts, Lamb, Pork, Side - широкі
    // На планшетах: тільки Desserts, Pork - широкі (CSS перевизначає)
    const wideCategories = ['Desserts', 'Lamb', 'Pork', 'Side'];
    return wideCategories.includes(categoryName) ? 'wide' : 'normal';
  };

  return (
    <div className={css.grid}>
      {displayCategories.map((category, index) => (
        <CategoryCard
          key={category._id}
          category={category}
          onClick={onCategoryClick}
          size={getCardSize(category.name)}
        />
      ))}
      
      {/* Картка "ALL CATEGORIES" */}
      <CategoryCard
        isAllCategories={true}
        onClick={() => onCategoryClick({ _id: 'all', name: 'All Categories' })}
        size="normal"
      />
    </div>
  );
};

export default CategoryList;
