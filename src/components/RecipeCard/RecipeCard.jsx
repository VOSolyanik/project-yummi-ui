import React, { useState, useCallback, useMemo } from 'react';

import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

import { addToFavorites, removeFromFavorites, clearFavoritesCache } from '@services/favoritesApi.js';
import PropTypes from 'prop-types';

import css from './RecipeCard.module.css';

import Button from '@components//Button/Button';
import Icon from '@components/Icon/Icon';
import PrivateLink from '@components/PrivateLink/PrivateLink';

import { useAuth } from '@hooks/useAuth.js';
import { useAuthModal } from '@hooks/useAuthModal.js';

import noImagePlaceholder from '@assets/images/no-image.png';

/**
 * RecipeCard component
 * @param {Object} props - Component props
 * @param {Object} props.recipe - Recipe data
 * @param {Function|null} props.onAuthorClick - Callback for author click
 * @param {Function|null} props.onRecipeClick - Callback for recipe click
 * @param {Set|null} props.favoriteRecipeIds - Set of favorite recipe IDs
 * @param {Function|null} props.onFavoriteChange - Callback for favorite change
 */
const RecipeCard = ({
  recipe,
  favoriteRecipeIds = null,
  onFavoriteChange = null
}) => {
  const [imageError, setImageError] = useState(false);
  const [isUpdatingFavorite, setIsUpdatingFavorite] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const { openSignInModal } = useAuthModal();

  // Calculate isFavorite from favoriteRecipeIds instead of local state
  const isFavorite = isAuthenticated && favoriteRecipeIds ? favoriteRecipeIds.has(recipe.id) : false;

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
        if (typeof onFavoriteChange === 'function') {
          onFavoriteChange(recipe.id, false);
        }
      } else {
        // Add to favorites
        await addToFavorites(recipe.id);
        clearFavoritesCache(user?.id); // Clear cache after modification
        toast.success('Recipe added to favorites');
        // Notify parent component about the change
        if (typeof onFavoriteChange === 'function') {
          onFavoriteChange(recipe.id, true);
        }
      }
    } catch (error) {
      // Handle specific server errors
      const errorMessage = error.response?.data?.message || error.message;

      if (errorMessage.includes('already in favorites')) {
        // Recipe is already in favorites, notify parent to update UI
        toast.success('Recipe is already in favorites');
        if (typeof onFavoriteChange === 'function') {
          onFavoriteChange(recipe.id, true);
        }
      } else if (errorMessage.includes('not in favorites')) {
        // Recipe is not in favorites, notify parent to update UI
        toast.success('Recipe is not in favorites');
        if (typeof onFavoriteChange === 'function') {
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

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  return (
    <div className={css.card}>
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
          <PrivateLink
            as={Link}
            to={`/user/${recipe.owner.id}`}
            aria-label={`View ${firstName}'s profile`}
            className={css.authorButton}
          >
            <img
              src={avatarUrl}
              alt={firstName}
              className={css.authorAvatar}
            />
            <span className={css.authorName}>
              {firstName}
            </span>
          </PrivateLink>

          <div className={css.buttonGroup}>
            <Button
              variant={isFavorite ? 'primary' : 'outline'}
              size="medium"
              onClick={handleFavoriteClick}
              disabled={isUpdatingFavorite}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Icon name="heart" size={18} />
            </Button>

            <Button
              as={Link}
              to={`/recipe/${recipe.id}`}
              variant="outline"
              size="medium"
              aria-label={`View ${recipe.title} recipe`}
            >
              <Icon name="arrow-up-right" size={18} />
            </Button>
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
      avatarUrl: PropTypes.string
    })
  }).isRequired,
  onAuthorClick: PropTypes.func,
  onRecipeClick: PropTypes.func,
  favoriteRecipeIds: PropTypes.instanceOf(Set),
  onFavoriteChange: PropTypes.func
};


export default RecipeCard;
