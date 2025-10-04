import React, { useState, useEffect } from 'react';

import css from './PopularRecipes.module.css';

import Loader from '@/components/Loader/Loader';
import RecipeCard from '@/components/RecipeCard/RecipeCard';
import { recipesAPI } from '@/services/recipesApi';

const PopularRecipes = () => {
  const [popular, setPopular] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        setIsLoading(true);
        const data = await recipesAPI.getPopularRecipes();
        setPopular(data);
      } catch (error) {
        setError('Failed to load popular recipes.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPopular();
  }, []);

  return (
    <aside className={css.popularSection}>
      <h2 className={css.title}>Popular Recipes</h2>
      {isLoading && <Loader />}
      {error && <p className={css.error}>{error}</p>}
      {!isLoading && !error && (
        <div className={css.list}>
          {popular.map(recipe => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      )}
    </aside>
  );
};

export default PopularRecipes;