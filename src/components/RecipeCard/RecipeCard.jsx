import React, { useState, useCallback, useMemo } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


import PropTypes from 'prop-types';

import css from './RecipeCard.module.css';

import { addRecipeToFavorites, removeRecipeFromFavorites, selectActionInProgress } from '@redux/auth/authSlice';

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
  recipe
}) => {
  const dispatch = useDispatch();
  const [imageError, setImageError] = useState(false);
  const isUpdatingFavorite = useSelector(selectActionInProgress);
  const { user, isAuthenticated } = useAuth();
  const { openSignInModal } = useAuthModal();

  const favoriteRecipeIds = useMemo(() => user?.favoriteIds ? new Set(user.favoriteIds) : null, [user?.favoriteIds]);

  // Calculate isFavorite from favoriteRecipeIds instead of local state
  const isFavorite = useMemo(
    () => isAuthenticated && favoriteRecipeIds ? favoriteRecipeIds.has(recipe.id) : false,
    [isAuthenticated, favoriteRecipeIds, recipe.id]
  );

  const firstName = useMemo(() => {
    return recipe.owner?.name ? recipe.owner.name.split(' ')[0] : 'Unknown';
  }, [recipe.owner?.name]);

  const avatarUrl = useMemo(() => {
    if (recipe.owner?.avatarUrl) {
      return recipe.owner.avatarUrl;
    }
    const name = recipe.owner?.name || 'User';
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=bfbebe&color=050505`;
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

    if (isFavorite) {
      // Remove from favorites
      dispatch(removeRecipeFromFavorites(recipe.id));
    } else {
      // Add to favorites
      dispatch(addRecipeToFavorites(recipe.id));
    }
  }, [isAuthenticated, openSignInModal, recipe.id, isFavorite, isUpdatingFavorite, dispatch]);

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
