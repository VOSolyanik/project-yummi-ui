import React from 'react';

import css from './CategoryCard.module.css';
import arrowUpRightIcon from '../../assets/icons/arrow-up-right.svg';

const CategoryCard = ({ category, onClick, isAllCategories = false, size = 'normal' }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(category);
    }
  };

  const getCategoryImageSources = (categoryName) => {
    const imageName = categoryName.replace(/\s+/g, '');

    try {
      return {
        fallback: new URL(`../../assets/images/categories/${imageName}.jpg`, import.meta.url).href,
        retina: new URL(`../../assets/images/categories/desktop/${imageName}@2x.jpg`, import.meta.url).href,
      };
    } catch (error) {
      return {
        fallback: `https://picsum.photos/650/369?random=${category._id}`,
        retina: `https://picsum.photos/1300/738?random=${category._id}`
      };
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

  const imageSources = getCategoryImageSources(category.name);

  return (
    <div className={`${css.card} ${css[size]}`} data-category={category.name} onClick={handleClick}>
      <div className={css.imageContainer}>
        <img
          src={imageSources.fallback}
          srcSet={`${imageSources.fallback} 1x, ${imageSources.retina} 2x`}
          alt={category.name}
          className={css.image}
          loading="lazy"
          decoding="async"
          width="650"
          height="369"
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