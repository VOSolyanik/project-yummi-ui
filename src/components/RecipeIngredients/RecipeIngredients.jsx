import React from 'react';

import styles from './RecipeIngredients.module.css';

const RecipeIngredients = ({ ingredients, recipeIngredients }) => {
  return (
    <div className={styles.recipeIngredients}>
      <h3>Ingredients</h3>
      <ul className={styles.ingredientsList}>
        {recipeIngredients.map((item) => {
          const ingredient = ingredients.find((ing) => ing._id === item.id);

          if (!ingredient) {
            console.warn(`Ingredient with id ${item.id} not found`);
            return null;
          }

          return (
            <li key={item.id} className={styles.ingredientItem}>
              <img
                src={ingredient.img || 'https://placehold.co/55x55?text=Ingredient'}
                alt={ingredient.name}
                className={styles.ingredientImage}
              />
              <div className={styles.ingredientData}>
                <div className={styles.ingredientName}>{ingredient.name}</div>
                <div className={styles.ingredientQuantity}>{item.measure}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RecipeIngredients;