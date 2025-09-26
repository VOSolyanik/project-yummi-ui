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
        // AVIF версії (найкраща компресія)
        avif1x: new URL(`../../assets/images/categories/${imageName}.avif`, import.meta.url).href,
        avif2x: new URL(`../../assets/images/categories/desktop/${imageName}@2x.avif`, import.meta.url).href,
        
        // WebP версії (хороша компресія)
        webp1x: new URL(`../../assets/images/categories/${imageName}.webp`, import.meta.url).href,
        webp2x: new URL(`../../assets/images/categories/desktop/${imageName}@2x.webp`, import.meta.url).href,
        
        // JPG fallback версії
        jpg1x: new URL(`../../assets/images/categories/${imageName}.jpg`, import.meta.url).href,
        jpg2x: new URL(`../../assets/images/categories/desktop/${imageName}@2x.jpg`, import.meta.url).href,
      };
    } catch (error) {
      return {
        avif1x: `https://picsum.photos/650/369?random=${category._id}`,
        avif2x: `https://picsum.photos/1300/738?random=${category._id}`,
        webp1x: `https://picsum.photos/650/369?random=${category._id}`,
        webp2x: `https://picsum.photos/1300/738?random=${category._id}`,
        jpg1x: `https://picsum.photos/650/369?random=${category._id}`,
        jpg2x: `https://picsum.photos/1300/738?random=${category._id}`
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
        <picture className={css.picture}>
          {/* AVIF з 2x підтримкою (найкраща компресія) */}
          <source
            srcSet={`${imageSources.avif1x} 1x, ${imageSources.avif2x} 2x`}
            type="image/avif"
          />
          
          {/* WebP з 2x підтримкою (хороша компресія) */}
          <source
            srcSet={`${imageSources.webp1x} 1x, ${imageSources.webp2x} 2x`}
            type="image/webp"
          />
          
          {/* JPG fallback з 2x підтримкою */}
          <source
            srcSet={`${imageSources.jpg1x} 1x, ${imageSources.jpg2x} 2x`}
            type="image/jpeg"
          />
          
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