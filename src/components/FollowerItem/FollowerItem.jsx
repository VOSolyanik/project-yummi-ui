import React, { useCallback, useEffect, useState } from 'react';

import { NavLink } from 'react-router-dom';

import { socialAPI } from '@services/socialApi.js';
import PropTypes from 'prop-types';

import css from './FollowerItem.module.css';

import Button from '@components/Button/Button.jsx';
import Icon from '@components/Icon/Icon.jsx';

import noAvatarImg from '@assets/images/no-avatar.webp';

import { recipesAPI } from '@/services/index.js';

const FollowerItem = ({ avatar, id, isFollowing: initialIsFollowing, recipesCount, username }) => {
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [recipesTotalCount, setRecipesTotalCount] = useState(0);
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const userRecipes = useCallback(async () => {
    try {
      const res = await recipesAPI.getRecipesByUser(id);
      setRecipes(res?.data?.recipes ?? []);
      setRecipesTotalCount(res?.data?.totalRecipes ?? 0);
    } catch (e) {
      console.error('Failed to load user recipes:', e);
    }
  }, [id]);

  const followUser = async (id) => {
    await socialAPI.followUser(id);
    setIsFollowing(true);
  };

  const unfollowUser = async (id) => {
    await socialAPI.unfollowUser(id);
    setIsFollowing(false);
  };

  useEffect(() => {
    userRecipes();
  }, [userRecipes]);

  useEffect(() => {
    setIsFollowing(initialIsFollowing);
  }, [initialIsFollowing]);

  const onButtonClick = async () => {
    setButtonDisabled(true);
    try {
      if (isFollowing) {
        await unfollowUser(id);
      } else {
        await followUser(id);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setButtonDisabled(false);
    }
  };

  function recipesToDisplay() {
    return recipes?.slice(0, recipesCount);
  }

  return (
    <div className={css.component}>
      <div className={css.user}>
        <NavLink className={css.avatar} to={`/user/${id}`}>
          {avatar ? (
            <img alt={`${username} avatar`} height="60" src={avatar} width="60" />
          ) : (
            <img alt={`${username} avatar`} height="60" src={noAvatarImg} width="60" />
          )}
        </NavLink>
        <div>
          <h3 className={css.username}>
            <NavLink to={`/user/${id}`}>{username}</NavLink>
          </h3>
          <p className={css['recipes-count']}>Own recipes: {recipesTotalCount}</p>
          {(
            <Button
              onClick={onButtonClick}
              disabled={buttonDisabled}
              variant="outline"
            >
              {isFollowing ? 'Unfollow' : 'Follow'}
            </Button>
          )}
        </div>
      </div>
      <div className={css.recipes}>
        {recipesToDisplay()?.map(recipe => (
          <NavLink className={css.recipe} key={recipe.id} to={`/recipe/${recipe.id}`}>
            <img alt="Thumbnail" className={css.thumbnail} height="100" src={recipe.thumbUrl} width="100" />
          </NavLink>
        ))}
      </div>
      <Button
        as={NavLink}
        to={`/user/${id}`}
        variant="outline"
        size="large">
        <Icon name="arrow-up-right"/>
      </Button>
    </div>
  );
};

FollowerItem.propTypes = {
  avatar: PropTypes.string,
  id: PropTypes.string.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  recipesCount: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired
};

export default FollowerItem;
