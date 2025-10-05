import React, { useMemo, useCallback } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import css from './RecipeInfo.module.css';

import { addRecipeToFavorites, removeRecipeFromFavorites, selectActionInProgress } from '@redux/auth/authSlice';

import noImagePlaceholder from '@assets/images/no-image.png';

import Button from '@/components/Button/Button';
import RecipeIngredients from '@/components/RecipeIngredients/RecipeIngredients';
import RecipeMainInfo from '@/components/RecipeMainInfo/RecipeMainInfo';
import RecipePreparation from '@/components/RecipePreparation/RecipePreparation';
import { useAuth } from '@/hooks/useAuth';
import { useAuthModal } from '@/hooks/useAuthModal';


const RecipeInfo = ({ recipe }) => {
  const dispatch = useDispatch();
  const isUpdatingFavorite = useSelector(selectActionInProgress);
  const { user, isAuthenticated } = useAuth();
  const { openSignInModal } = useAuthModal();

  const favoriteRecipeIds = useMemo(() => user?.favoriteIds ? new Set(user.favoriteIds) : null, [user?.favoriteIds]);

  // Calculate isFavorite from favoriteRecipeIds instead of local state
  const isFavorite = useMemo(
    () => isAuthenticated && favoriteRecipeIds ? favoriteRecipeIds.has(recipe.id) : false,
    [isAuthenticated, favoriteRecipeIds, recipe.id]
  );


  const handleFavoriteToggle = useCallback(async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      openSignInModal();
      return;
    }

    // Prevent multiple clicks while updating
    if (isUpdatingFavorite) {
      return;
    }

    if (isFavorite) {
      // Remove from favorites
      dispatch(removeRecipeFromFavorites(recipe.id));
    } else {
      // Add to favorites
      dispatch(addRecipeToFavorites(recipe.id));
    }
  }, [isAuthenticated, openSignInModal, recipe.id, isFavorite, isUpdatingFavorite, dispatch]);


  const handleImageError = (e) => {
    e.target.src = noImagePlaceholder;
  };

  if (!recipe) {
    return null;
  }

  return (
    <div className={css.recipeInfo}>
      <img
        src={recipe.thumbUrl || noImagePlaceholder}
        alt={recipe.title}
        className={css.recipeImage}
        onError={handleImageError}
      />
      <div className={css.detailsWrapper}>
        <RecipeMainInfo recipe={recipe} />
        <RecipeIngredients ingredients={recipe.ingredients} />
        <RecipePreparation instructions={recipe.instructions} />
        <Button
          variant="outline"
          size="large"
          onClick={handleFavoriteToggle}
          disabled={isUpdatingFavorite}
          className={css.favoriteButton}
        >
          {isUpdatingFavorite ? 'Updating...' : (isFavorite ? 'Remove from favorites' : 'Add to favorites')}
        </Button>
      </div>
    </div>
  );
};

export default RecipeInfo;