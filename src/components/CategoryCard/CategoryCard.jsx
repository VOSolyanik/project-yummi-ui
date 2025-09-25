import React from 'react';

import css from './CategoryCard.module.css';
import arrowUpRightIcon from '../../assets/icons/arrow-up-right.svg';

const CategoryCard = ({ category, onClick, isAllCategories = false, size = 'normal' }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(category);
    }
  };

  const getCategoryImage = (categoryName) => {
    const imageName = categoryName.replace(/\s+/g, '');
    try {
      return new URL(`../../assets/images/categories/${imageName}.jpg`, import.meta.url).href;
    } catch (error) {
      return `https://picsum.photos/300/300?random=${category._id}`;
    }
  };

  if (isAllCategories) {
    return (
      <div className={`${css.card} ${css[size]}`} onClick={handleClick}>
        <div className={css.allCategoriesButton}>
          ALL CATEGORIES
        </div>
      </div>
    );
  }

  return (
    <div className={`${css.card} ${css[size]}`} data-category={category.name} onClick={handleClick}>
      <div className={css.imageContainer}>
        <img 
          src={getCategoryImage(category.name)}
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
            <img 
              src={arrowUpRightIcon} 
              alt="arrow" 
              className={css.arrowIcon}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
