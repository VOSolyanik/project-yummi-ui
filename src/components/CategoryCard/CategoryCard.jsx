import React from 'react';

import css from './CategoryCard.module.css';

import arrowUpRightIcon from '../../assets/icons/arrow-up-right.svg';

const CategoryCard = ({ category, onClick, isAllCategories = false, size = 'normal' }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(category);
    }
  };

  const getCategoryImageSources = categoryName => {
    const imageName = categoryName.replace(/\s+/g, '');

    try {
      return {
        // AVIF versions (best compression)
        avif1x: new URL(`../../assets/images/categories/${imageName}.avif`, import.meta.url).href,
        avif2x: new URL(`../../assets/images/categories/desktop/${imageName}@2x.avif`, import.meta.url).href,

        // WebP versions (good compression)
        webp1x: new URL(`../../assets/images/categories/${imageName}.webp`, import.meta.url).href,
        webp2x: new URL(`../../assets/images/categories/desktop/${imageName}@2x.webp`, import.meta.url).href,

        // JPG fallback versions
        jpg1x: new URL(`../../assets/images/categories/${imageName}.jpg`, import.meta.url).href,
        jpg2x: new URL(`../../assets/images/categories/desktop/${imageName}@2x.jpg`, import.meta.url).href
      };
    } catch (error) {
      console.error(`Failed to load images for category: ${categoryName}`, error);
      return null;
    }
  };

  if (isAllCategories) {
    return (
      <div className={`${css.card} ${css[size]}`} onClick={handleClick}>
        <div className={css.allCategoriesButton}>ALL CATEGORIES</div>
      </div>
    );
  }

  const imageSources = getCategoryImageSources(category.name);

  // Common overlay component
  const overlay = (
    <div className={css.overlay}>
      <span className={css.categoryName}>{category.name}</span>
      <button type="button" className={css.arrowButton} aria-label={`View ${category.name} recipes`}>
        <img src={arrowUpRightIcon} alt="arrow" className={css.arrowIcon} />
      </button>
    </div>
  );

  // If image sources failed to load, show empty card
  if (!imageSources) {
    return (
      <div className={`${css.card} ${css[size]}`} data-category={category.name} onClick={handleClick}>
        <div className={css.imageContainer}>{/* Empty container - no image */}</div>
        {overlay}
      </div>
    );
  }

  return (
    <div className={`${css.card} ${css[size]}`} data-category={category.name} onClick={handleClick}>
      <div className={css.imageContainer}>
        <picture className={css.picture}>
          {/* AVIF with 2x support (best compression) */}
          <source srcSet={`${imageSources.avif1x} 1x, ${imageSources.avif2x} 2x`} type="image/avif" />

          {/* WebP with 2x support (good compression) */}
          <source srcSet={`${imageSources.webp1x} 1x, ${imageSources.webp2x} 2x`} type="image/webp" />

          {/* JPG fallback with 2x support */}
          <source srcSet={`${imageSources.jpg1x} 1x, ${imageSources.jpg2x} 2x`} type="image/jpeg" />

          {/* Fallback img */}
          <img
            src={imageSources.jpg1x}
            alt={category.name}
            className={css.image}
            loading="lazy"
            decoding="async"
            width="650"
            height="369"
          />
        </picture>
      </div>
      {overlay}
    </div>
  );
};

export default CategoryCard;
