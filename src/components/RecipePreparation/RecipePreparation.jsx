import React from 'react';

import styles from './RecipePreparation.module.css';

const RecipePreparation = ({ instructions }) => {
  return (
    <div className={styles.recipePreparation}>
      <h3>Preparation</h3>
      <p className={styles.preparationText}>{instructions}</p>
    </div>
  );
};

export default RecipePreparation;