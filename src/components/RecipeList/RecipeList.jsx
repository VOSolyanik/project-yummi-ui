import React, { useMemo } from 'react';

import css from './RecipeList.module.css';

import RecipeCard from '@components/RecipeCard/RecipeCard';
import RecipeCardSkeleton from '@components/RecipeCardSkeleton/RecipeCardSkeleton';

const RecipeList = ({ recipes, isLoading, error }) => {
  // Memoize the recipes list to prevent unnecessary re-renders
  const memoizedRecipes = useMemo(() => {
    return recipes || [];
  }, [recipes]);

  if (isLoading) {
    return (
      <div className={css.grid}>
        {Array.from({ length: 6 }).map((_, index) => (
          <RecipeCardSkeleton key={index} />
        ))}
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

  if (!memoizedRecipes || memoizedRecipes.length === 0) {
    return (
      <div className={css.empty}>
        <p>No recipes found.</p>
      </div>
    );
  }

  return (
    <div className={css.grid}>
      {memoizedRecipes.map(recipe => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
        />
      ))}
    </div>
  );
};

export default RecipeList;
