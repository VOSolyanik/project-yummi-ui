import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import css from './RecipeCard.module.css';

import heartIcon from '../../assets/icons/favorites.svg';
import arrowIcon from '../../assets/icons/arrow-up-right-black.svg';
import noImagePlaceholder from '../../assets/images/no-image.png';

import { useAuth } from '../../hooks/useAuth';
import { useAuthModal } from '../../hooks/useAuthModal';
import { addToFavorites, removeFromFavorites, checkIfRecipeIsFavorite, clearFavoritesCache } from '../../services/favoritesApi';
import toast from 'react-hot-toast';

const RecipeCard = ({ 
  recipe, 
  onFavoriteToggle = null, 
  onAuthorClick = null, 
  onRecipeClick = null, 
  favoriteRecipeIds = null, 
  onFavoriteChange = null 
}) => {
  const [imageError, setImageError] = useState(false);
  const [isUpdatingFavorite, setIsUpdatingFavorite] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { openSignInModal } = useAuthModal();

  // Calculate isFavorite from favoriteRecipeIds instead of local state
  const isFavorite = isAuthenticated && favoriteRecipeIds ? favoriteRecipeIds.has(recipe.id) : false;
  
  const buttonClassName = `${css.favoriteButton} ${isFavorite ? css.favoriteActive : ''}`;

  const firstName = useMemo(() => {
    return recipe.owner?.name ? recipe.owner.name.split(' ')[0] : 'Unknown';
  }, [recipe.owner?.name]);

  const avatarUrl = useMemo(() => {
    if (recipe.owner?.avatarUrl) {
      return recipe.owner.avatarUrl;
    }
    const name = recipe.owner?.name || 'User';
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;
  }, [recipe.owner?.avatarUrl, recipe.owner?.name]);


  const handleFavoriteClick = useCallback(async (e) => {
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

    setIsUpdatingFavorite(true);

    try {
      if (isFavorite) {
        // Remove from favorites
        await removeFromFavorites(recipe.id);
        clearFavoritesCache(user?.id); // Clear cache after modification
        toast.success('Recipe removed from favorites');
        // Notify parent component about the change
        if (onFavoriteChange) {
          onFavoriteChange(recipe.id, false);
        }
      } else {
        // Add to favorites
        await addToFavorites(recipe.id);
        clearFavoritesCache(user?.id); // Clear cache after modification
        toast.success('Recipe added to favorites');
        // Notify parent component about the change
        if (onFavoriteChange) {
          onFavoriteChange(recipe.id, true);
        }
      }
    } catch (error) {
      // Handle specific server errors
      const errorMessage = error.response?.data?.message || error.message;
      
      if (errorMessage.includes('already in favorites')) {
        // Recipe is already in favorites, notify parent to update UI
        toast.success('Recipe is already in favorites');
        if (onFavoriteChange) {
          onFavoriteChange(recipe.id, true);
        }
      } else if (errorMessage.includes('not in favorites')) {
        // Recipe is not in favorites, notify parent to update UI
        toast.success('Recipe is not in favorites');
        if (onFavoriteChange) {
          onFavoriteChange(recipe.id, false);
        }
      } else {
        // Other errors
        toast.error('Failed to update favorites');
        console.error('Error updating favorites:', error);
      }
    } finally {
      setIsUpdatingFavorite(false);
    }
  }, [isAuthenticated, openSignInModal, user?.id, recipe.id, isFavorite, isUpdatingFavorite, onFavoriteChange]);

  const handleAuthorClick = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      openSignInModal();
      return;
    }

    if (onAuthorClick) {
      onAuthorClick(recipe.owner);
    } else {
      // Navigate to user page
      if (recipe.owner?.id) {
        navigate(`/user/${recipe.owner.id}`);
      }
    }
  }, [navigate, isAuthenticated, openSignInModal, onAuthorClick, recipe.owner]);

  const handleRecipeClick = useCallback(() => {
    if (onRecipeClick) {
      onRecipeClick(recipe);
    }
  }, [onRecipeClick, recipe]);

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  return (
    <div className={css.card} onClick={handleRecipeClick}>
      <div className={css.imageContainer}>
        <img
          src={imageError || !recipe.thumbUrl ? noImagePlaceholder : recipe.thumbUrl}
          alt={recipe.title}
          className={css.image}
          loading="lazy"
          onError={handleImageError}
        />
      </div>

      <div className={css.content}>
        <h3 className={css.title}>{recipe.title}</h3>

        <p className={css.description}>
          {recipe.description}
        </p>

        <div className={css.footer}>
          <button
            type="button"
            className={css.authorButton}
            onClick={handleAuthorClick}
          >
            <img
              src={avatarUrl}
              alt={firstName}
              className={css.authorAvatar}
            />
            <span className={css.authorName}>
              {firstName}
            </span>
          </button>

          <div className={css.buttonGroup}>
                <button
                  key={`favorite-${recipe.id}-${isFavorite}`}
                  type="button"
                  className={buttonClassName}
                  onClick={handleFavoriteClick}
                  disabled={isUpdatingFavorite}
                  aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
              <img
                src={heartIcon}
                alt="heart"
                className={css.heartIcon}
              />
            </button>

            <button
              type="button"
              className={css.viewButton}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                navigate(`/recipe/${recipe.id}`);
              }}
              aria-label={`View ${recipe.title} recipe`}
            >
              <img
                src={arrowIcon}
                alt="arrow"
                className={css.arrowIcon}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

RecipeCard.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    thumbUrl: PropTypes.string,
    owner: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
      avatarUrl: PropTypes.string,
    }),
  }).isRequired,
  onFavoriteToggle: PropTypes.func,
  onAuthorClick: PropTypes.func,
  onRecipeClick: PropTypes.func,
  favoriteRecipeIds: PropTypes.instanceOf(Set),
  onFavoriteChange: PropTypes.func,
};


export default RecipeCard;
