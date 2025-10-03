import React from 'react';

import styles from './PopularRecipes.module.css';

import RecipeCard from '@components/RecipeCard/RecipeCard';

const PopularRecipes = ({ recipes }) => {
  return (
    <div className={styles.popularRecipes}>
      <h3>Popular Recipes</h3>
      <div className={styles.popularRecipesList}>
        {recipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default PopularRecipes;