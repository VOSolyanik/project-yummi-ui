import React from 'react';

import clsx from 'clsx';

import css from './CategoryCard.module.css';
import arrowUpRightIcon from '../../assets/icons/arrow-up-right.svg';

const CategoryCard = ({ category, onClick, isAllCategories = false, size = 'normal' }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(category);
    }
  };

  // Функція для отримання зображення категорії
  const getCategoryImage = (categoryName) => {
    const imageName = categoryName.replace(/\s+/g, ''); // Видаляємо пробіли
    try {
      return new URL(`../../assets/images/categories/${imageName}.jpg`, import.meta.url).href;
    } catch (error) {
      // Fallback до випадкового зображення, якщо файл не знайдено
      return `https://picsum.photos/300/300?random=${category._id}`;
    }
  };

  if (isAllCategories) {
    return (
      <div className={clsx(css.card, css[size])} onClick={handleClick}>
        <div className={css.allCategoriesButton}>
          ALL CATEGORIES
        </div>
      </div>
    );
  }

  return (
    <div className={clsx(css.card, css[size])} data-category={category.name} onClick={handleClick}>
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
