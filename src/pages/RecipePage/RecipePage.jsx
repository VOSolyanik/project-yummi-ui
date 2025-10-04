import React, { useEffect } from 'react';

import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import css from './RecipePage.module.css';


import Loader from '@/components/Loader/Loader';
import PathInfo from '@/components/PathInfo/PathInfo';
import PopularRecipes from '@/components/PopularRecipes/PopularRecipes';
import RecipeInfo from '@/components/RecipeInfo/RecipeInfo';
import { BASE_TITLE } from '@/constants/pages';
import {
  fetchRecipeById, 
  clearRecipe,
  selectRecipeData,
  selectRecipeIsLoading,
  selectRecipeError
} from '@/redux/recipeDetail/recipeDetailSlice';

const RecipePage = () => {
  const { recipeId } = useParams();
  const dispatch = useDispatch();

  const recipe = useSelector(selectRecipeData);
  const isLoading = useSelector(selectRecipeIsLoading);
  const error = useSelector(selectRecipeError);

  useEffect(() => {
    if (recipeId) {
      dispatch(fetchRecipeById(recipeId));
    }

    // Cleanup function to clear recipe data on component unmount
    return () => {
      dispatch(clearRecipe());
    };
  }, [dispatch, recipeId]);

  return (
    <>
      <Helmet>
        <title>{recipe ? `${recipe.title} - ${BASE_TITLE}` : `Recipe - ${BASE_TITLE}`}</title>
      </Helmet>
      <div className={`container ${css.page}`}>
        {isLoading && <Loader />}
        {error && <p className={css.error}>Error: {error}</p>}
        {recipe && !isLoading && (
          <>
            <PathInfo currentPage={recipe.title} />
            <div className={css.contentWrapper}>
              <main className={css.mainContent}>
                <RecipeInfo recipe={recipe} />
              </main>
              <div className={css.sidebar}>
                <PopularRecipes />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default RecipePage;