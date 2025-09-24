import React from 'react';

import clsx from 'clsx';

import css from './CategoryCard.module.css';
import Icon from '@components/Icon/Icon';

const CategoryCard = ({ category, onClick, isAllCategories = false }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(category);
    }
  };

  if (isAllCategories) {
    return (
      <div className={css.card} onClick={handleClick}>
        <div className={css.allCategoriesButton}>
          ALL CATEGORIES
        </div>
      </div>
    );
  }

  return (
    <div className={css.card} onClick={handleClick}>
      <div className={css.imageContainer}>
        <img 
          src={`https://picsum.photos/300/300?random=${category._id}`}
          alt={category.name}
          className={css.image}
          loading="lazy"
        />
        <div className={css.overlay}>
          <span className={css.categoryName}>{category.name}</span>
          <button
            type="button"
            className={css.arrowButton}
            aria-label={`View ${category.name} recipes`}
          >
            <Icon name="arrow-right" className={css.arrowIcon} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
