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
      navigate(`/user/${recipe.owner.$oid}`);
    }
  };

  const handleImageError = (e) => {
    e.target.src = noImagePlaceholder;
  };

  return (
    <div className={css.mainInfo}>
      <img
        src={recipe.thumb}
        alt={recipe.title}
        className={css.recipeImage}
        onError={handleImageError}
      />
      <div className={css.details}>
        <h1 className={css.title}>{recipe.title}</h1>
        <div className={css.tags}>
          <span className={css.tag}>{recipe.category}</span>
          <span className={css.tag}>{recipe.time} min</span>
        </div>
        <p className={css.description}>{recipe.description}</p>
        
// TODO: Змінити на отримання Власника по ID
// TODO: замінити `className={css.authorButton}` на  `recipeInfoDataOwner`

        <button type="button" className={css.authorButton} onClick={handleAuthorClick}>
          {/* We don't have author details, so using a placeholder */}
          <div className={css.authorAvatar}></div>
          <div className={css.authorInfo}>
            <span className={css.authorLabel}>Created by:</span>
            <span className={css.authorName}>Recipe Author</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default RecipeMainInfo;