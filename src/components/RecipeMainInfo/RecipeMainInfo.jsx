import React from 'react';

import styles from './RecipeMainInfo.module.css';

const RecipeMainInfo = ({ recipe, onAuthorClick, owner }) => {
  return (
    <div className={styles.recipeMainInfo}>
      <img
        src={recipe.thumb}
        alt={recipe.title}
        className={styles.recipeImage}
      />
      <div className={styles.recipeDetails}>
        <h2 className={styles.recipeTitle}>{recipe.title}</h2>
        <div className={styles.recipeTags}>
          <div className={styles.recipeCategory}>{recipe.category}</div>
          <div className={styles.recipeTime}>{recipe.time} min</div>
        </div>
        <p className={styles.recipeDescription}>{recipe.description}</p>
        <button
          type="button"
          className={styles.recipeOwnerButton}
          onClick={onAuthorClick}
        >
          Created by: {owner.name}
        </button>
      </div>
    </div>
  );
};

export default RecipeMainInfo;