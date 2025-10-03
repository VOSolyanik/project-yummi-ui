import React from 'react';
import css from './RecipeCardSkeleton.module.css';

const RecipeCardSkeleton = () => {
  return (
    <div className={css.skeletonCard}>
      <div className={css.skeletonImage}></div>
      <div className={css.skeletonContent}>
        <div className={css.skeletonTitle}></div>
        <div className={css.skeletonDescription}></div>
        <div className={css.skeletonDescription}></div>
        <div className={css.skeletonMeta}>
          <div className={css.skeletonTime}></div>
          <div className={css.skeletonDifficulty}></div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCardSkeleton;
