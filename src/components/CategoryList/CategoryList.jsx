import React, { useState, useEffect } from 'react';

import css from './CategoryList.module.css';

import CategoryCard from '@components/CategoryCard/CategoryCard';

const WIDE_CATEGORIES = ['Desserts', 'Lamb', 'Pork', 'Side', 'Vegan'];
const INITIAL_DISPLAY_CATEGORIES_DESKTOP = 11;
const INITIAL_DISPLAY_CATEGORIES_MOBILE = 8;

const CategoryList = ({ categories, onCategoryClick, isLoading, error }) => {
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const getCardSize = categoryName => {
    return WIDE_CATEGORIES.includes(categoryName) ? 'wide' : 'normal';
  };

  const handleAllCategoriesClick = () => {
    if (!showAllCategories) {
      setShowAllCategories(true);
    } else {
      onCategoryClick({ _id: 'all', name: 'All Categories' });
    }
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

  const initialCategoriesCount = isMobile ? INITIAL_DISPLAY_CATEGORIES_MOBILE : INITIAL_DISPLAY_CATEGORIES_DESKTOP;
  const displayCategories = showAllCategories ? categories : categories.slice(0, initialCategoriesCount);

  return (
    <div className={css.grid}>
      {displayCategories.map(category => (
        <CategoryCard
          key={category._id}
          category={category}
          onClick={onCategoryClick}
          size={getCardSize(category.name)}
        />
      ))}

      <CategoryCard
        isAllCategories={true}
        onClick={handleAllCategoriesClick}
        size="normal"
        buttonText={showAllCategories ? "VIEW ALL RECIPES" : "ALL CATEGORIES"}
      />
    </div>
  );
};

export default CategoryList;
