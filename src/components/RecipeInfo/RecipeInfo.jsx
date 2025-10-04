import React, { useState, useEffect, useCallback } from 'react';

import toast from 'react-hot-toast';

import css from './RecipeInfo.module.css';

import Button from '@/components/Button/Button';
import RecipeIngredients from '@/components/RecipeIngredients/RecipeIngredients';
import RecipeMainInfo from '@/components/RecipeMainInfo/RecipeMainInfo';
import RecipePreparation from '@/components/RecipePreparation/RecipePreparation';
import { useAuth } from '@/hooks/useAuth';
import { 
  addToFavorites, 
  removeFromFavorites, 
  checkIfRecipeIsFavorite 
} from '@/services/favoritesApi';

const RecipeInfo = ({ recipe }) => {
  const { user, isAuthenticated } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const checkFavoriteStatus = useCallback(async () => {
    if (isAuthenticated && user?.id && recipe?._id) {
      const result = await checkIfRecipeIsFavorite(user.id, recipe._id);
      setIsFavorite(result);
    }
  }, [isAuthenticated, user?.id, recipe?._id]);

  useEffect(() => {
    checkFavoriteStatus();
  }, [checkFavoriteStatus]);

  const handleFavoriteToggle = async () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to manage favorites.');
      return;
    }

    setIsUpdating(true);
    try {
      if (isFavorite) {
        await removeFromFavorites(recipe._id);
        toast.success('Removed from favorites!');
        setIsFavorite(false);
      } else {
        await addToFavorites(recipe._id);
        toast.success('Added to favorites!');
        setIsFavorite(true);
      }
    } catch (error) {
      toast.error('Could not update favorites.');
    } finally {
      setIsUpdating(false);
    }
  };

  if (!recipe) {
    return null;
  }

  return (
    <div className={css.recipeInfo}>
      <RecipeMainInfo recipe={recipe} />
      <RecipeIngredients ingredients={recipe.ingredients} />
      <RecipePreparation instructions={recipe.instructions} />
      <Button 
        variant="outline" 
        size="large" 
        onClick={handleFavoriteToggle}
        disabled={isUpdating}
      >
        {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      </Button>
    </div>
  );
};

export default RecipeInfo;