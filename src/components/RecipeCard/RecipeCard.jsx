import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import css from './RecipeCard.module.css';

import heartIcon from '../../assets/icons/heart.svg';
import arrowIcon from '../../assets/icons/arrow-up-right.svg';

const RecipeCard = ({ recipe, onFavoriteToggle }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (onFavoriteToggle) {
      onFavoriteToggle(recipe.id);
    } else {
      setIsFavorite(!isFavorite);
    }
  };

  const handleAuthorClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleRecipeClick = () => {
  };

  return (
    <div className={css.card} onClick={handleRecipeClick}>
      <div className={css.imageContainer}>
        <img
          src={recipe.thumbUrl || `https://picsum.photos/300/300?random=${recipe.id}`}
          alt={recipe.title}
          className={css.image}
          loading="lazy"
        />
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
      </div>

      <div className={css.content}>
        <h3 className={css.title}>{recipe.title}</h3>

        <p className={css.description}>
          {recipe.description?.length > 100
            ? `${recipe.description.substring(0, 100)}...`
            : recipe.description}
        </p>

        <div className={css.footer}>
          <button
            type="button"
            className={css.authorButton}
            onClick={handleAuthorClick}
          >
            <img
              src={recipe.owner?.avatarUrl || `https://ui-avatars.com/api/?name=${recipe.owner?.name || 'User'}&background=random`}
              alt={recipe.owner?.name || 'Author'}
              className={css.authorAvatar}
            />
            <span className={css.authorName}>
              {recipe.owner?.name || 'Unknown'}
            </span>
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
  );
};

export default RecipeCard;
