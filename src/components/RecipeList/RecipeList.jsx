import React from 'react';

import css from './RecipeList.module.css';

import RecipeCard from '@components/RecipeCard/RecipeCard';

const RecipeList = ({ recipes, onFavoriteToggle, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className={css.loading}>
        <div className={css.loadingSpinner}></div>
        <p>Loading recipes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={css.error}>
        <p>Error loading recipes: {error}</p>
      </div>
    );
  }

  if (!recipes || recipes.length === 0) {
    return (
      <div className={css.empty}>
        <p>No recipes found.</p>
      </div>
    );
  }

  return (
    <div className={css.grid}>
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onFavoriteToggle={onFavoriteToggle}
        />
      ))}
    </div>
  );
};

export default RecipeList;
