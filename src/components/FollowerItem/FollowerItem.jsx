import React from 'react';

import { NavLink } from 'react-router-dom';

import PropTypes from 'prop-types';

import css from './FollowerItem.module.css';

import Button from '@components/Button/Button.jsx';
import Icon from '@components/Icon/Icon.jsx';

import noAvatarImg from '@assets/images/no-avatar.webp';


const FollowerItem = ({ user, isCurrent, isFollowing, recipesCount, onFollowToggle }) => {
  const recipesToShow = user?.latestRecipes ? user.latestRecipes.slice(0, recipesCount) : [];

  const handleFollowToggle = () => {
    onFollowToggle(user.id, isFollowing);
  };

  return (
    <div className={css.component}>
      <div className={css.user}>
        <NavLink className={css.avatar} to={`/user/${user.id}`}>
          {user.avatarUrl ? (
            <img alt={`${user.name} avatar`} height="60" src={user.avatarUrl} width="60" />
          ) : (
            <img alt={`${user.name} avatar`} height="60" src={noAvatarImg} width="60" />
          )}
        </NavLink>
        <div>
          <h3 className={css.username}>
            <NavLink to={`/user/${user.id}`}>{user.name}</NavLink>
          </h3>
          <p className={css['recipes-count']}>Own recipes: {user.ownRecipesCount}</p>
          {!isCurrent && (
            <Button
              onClick={handleFollowToggle}
              variant="outline"
            >
              {isFollowing ? 'Unfollow' : 'Follow'}
            </Button>
          )}
        </div>
      </div>
      <div className={css.recipes}>
        {recipesToShow.map(recipe => (
          <NavLink className={css.recipe} key={recipe.id} to={`/recipe/${recipe.id}`}>
            <img alt="Thumbnail" className={css.thumbnail} height="100" src={recipe.thumbUrl} width="100" />
          </NavLink>
        ))}
      </div>
      <Button
        as={NavLink}
        to={`/user/${user.id}`}
        variant="outline"
        size="large">
        <Icon name="arrow-up-right"/>
      </Button>
    </div>
  );
};

FollowerItem.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string,
    ownRecipesCount: PropTypes.number.isRequired,
    latestRecipes: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        thumbUrl: PropTypes.string.isRequired
      })
    )
  }).isRequired,
  isCurrent: PropTypes.bool.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  recipesCount: PropTypes.number.isRequired,
  onFollowToggle: PropTypes.func.isRequired
};

export default FollowerItem;
