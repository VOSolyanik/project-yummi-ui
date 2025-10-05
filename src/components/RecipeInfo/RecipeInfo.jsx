import React, { useState, useEffect } from 'react';

import toast from 'react-hot-toast';

import css from './RecipeInfo.module.css';

import noImagePlaceholder from '../../assets/images/no-image.png';

import Button from '@/components/Button/Button';
import RecipeIngredients from '@/components/RecipeIngredients/RecipeIngredients';
import RecipeMainInfo from '@/components/RecipeMainInfo/RecipeMainInfo';
import RecipePreparation from '@/components/RecipePreparation/RecipePreparation';
import { useAuth } from '@/hooks/useAuth';
import { useAuthModal } from '@/hooks/useAuthModal';
import {
  addToFavorites,
  removeFromFavorites,
  checkIfRecipeIsFavorite,
  clearFavoritesCache
} from '@/services/favoritesApi';

const RecipeInfo = ({ recipe }) => {
  const { user, isAuthenticated } = useAuth();
  const { openSignInModal } = useAuthModal();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const checkStatus = async () => {
      if (isAuthenticated && user?.id && recipe?.id) {
        setIsUpdating(true);
        const result = await checkIfRecipeIsFavorite(user.id, recipe.id);
        setIsFavorite(result);
        setIsUpdating(false);
      }
    };
    checkStatus();
  }, [isAuthenticated, user?.id, recipe?.id]);

  const handleFavoriteToggle = async () => {
    if (!isAuthenticated) {
      openSignInModal();
      return;
    }

    setIsUpdating(true);
    try {
      if (isFavorite) {
        await removeFromFavorites(recipe.id);
        toast.success('Removed from favorites!');
        setIsFavorite(false);
      } else {
        await addToFavorites(recipe.id);
        toast.success('Added to favorites!');
        setIsFavorite(true);
      }
      clearFavoritesCache(user.id);
    } catch (error) {
      toast.error('Could not update favorites.');
      console.error('Favorite toggle error:', error);
    } finally {
      setIsUpdating(false);
    }
  };

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
          disabled={isUpdating}
          className={css.favoriteButton}
        >
          {isUpdating ? 'Updating...' : (isFavorite ? 'Remove from favorites' : 'Add to favorites')}
        </Button>
      </div>
    </div>
  );
};

export default RecipeInfo;