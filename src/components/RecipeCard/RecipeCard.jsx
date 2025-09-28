import React, { useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import css from './RecipeCard.module.css';

import heartIcon from '../../assets/icons/favorites.svg';
import arrowIcon from '../../assets/icons/arrow-up-right-black.svg';
import noImagePlaceholder from '../../assets/images/no-image.png';

const RecipeCard = ({ recipe, onFavoriteToggle, onAuthorClick, onRecipeClick }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageError, setImageError] = useState(false);

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

  const handleFavoriteClick = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();

    if (onFavoriteToggle) {
      onFavoriteToggle(recipe.id);
    } else {
      setIsFavorite(!isFavorite);
    }
  }, [onFavoriteToggle, recipe.id, isFavorite]);

  const handleAuthorClick = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();

    if (onAuthorClick) {
      onAuthorClick(recipe.owner);
    }
  }, [onAuthorClick, recipe.owner]);

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
              type="button"
              className={`${css.favoriteButton} ${isFavorite ? css.favoriteActive : ''}`}
              onClick={handleFavoriteClick}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <img
                src={heartIcon}
                alt="heart"
                className={css.heartIcon}
              />
            </button>

            <Link
              to={`/recipe/${recipe.id}`}
              className={css.viewButton}
              aria-label={`View ${recipe.title} recipe`}
            >
              <img
                src={arrowIcon}
                alt="arrow"
                className={css.arrowIcon}
              />
            </Link>
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
};

RecipeCard.defaultProps = {
  onFavoriteToggle: null,
  onAuthorClick: null,
  onRecipeClick: null,
};

export default RecipeCard;
