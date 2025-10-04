import React from 'react';

import { useNavigate } from 'react-router-dom';

import css from './RecipeMainInfo.module.css';

import noImagePlaceholder from '../../assets/images/no-image.png';

import { useAuth } from '@/hooks/useAuth';
import { useAuthModal } from '@/hooks/useAuthModal';

const RecipeMainInfo = ({ recipe }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { openSignInModal } = useAuthModal();

  const handleAuthorClick = () => {
    if (!isAuthenticated) {
      openSignInModal();
    } else {
      navigate(`/user/${recipe.owner.id}`);
    }
  };

  const handleImageError = (e) => {
    e.target.src = noImagePlaceholder;
  };

  return (
    <div className={css.mainInfo}>
      <img
        src={recipe.thumbUrl || noImagePlaceholder}
        alt={recipe.title}
        className={css.recipeImage}
        onError={handleImageError}
      />
      <div className={css.details}>
        <h1 className={css.title}>{recipe.title}</h1>
        <div className={css.tags}>
          <span className={css.tag}>{recipe.category.name}</span>
          <span className={css.tag}>{recipe.time} min</span>
        </div>
        <p className={css.description}>{recipe.description}</p>

        <button type="button" className={css.authorButton} onClick={handleAuthorClick}>
          {recipe.owner.avatarUrl ? (
            <img src={recipe.owner.avatarUrl} alt={recipe.owner.name} className={css.authorAvatar} />
          ) : (
            <div className={css.authorAvatarPlaceholder}>
              {recipe.owner.name.charAt(0)}
            </div>
          )}
          <div className={css.authorInfo}>
            <span className={css.authorLabel}>Created by:</span>
            <span className={css.authorName}>{recipe.owner.name}</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default RecipeMainInfo;