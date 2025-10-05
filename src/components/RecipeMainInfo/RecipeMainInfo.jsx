import React from 'react';

import { Link } from 'react-router-dom';

import css from './RecipeMainInfo.module.css';

import PrivateLink from '@components/PrivateLink/PrivateLink';

const RecipeMainInfo = ({ recipe }) => {

  return (
    <>
      <div className={css.details}>
        <h1 className={css.title}>{recipe.title}</h1>
        <div className={css.tags}>
          <span className={css.tag}>{recipe.category.name}</span>
          <span className={css.tag}>{recipe.time} min</span>
        </div>
        <p className={css.description}>{recipe.description}</p>

        <PrivateLink as={Link} to={`/user/${recipe.owner.id}`} className={css.authorButton}>
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
        </PrivateLink>
      </div>
    </>
  );
};

export default RecipeMainInfo;
