import React, { useCallback, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import css from './ListItems.module.css';

import { selectUser, followUser, unfollowUser, removeRecipeFromFavorites } from '@redux/auth/authSlice';
import {
  fetchRecipes,
  fetchFavorites,
  fetchFollowers,
  fetchFollowing
} from '@redux/users/usersSlice';

import FollowerItem from '@components/FollowerItem/FollowerItem.jsx';

import { useViewport } from '@hooks/useViewport.js';

import Loader from '../Loader/Loader';
import RecipesPreview from '../RecipesPreview';


const ListItems = ({ type, user }) => {
  const dispatch = useDispatch();
  const userLists = useSelector((state) => state.users);
  const currentUser = useSelector(selectUser);

  const { width } = useViewport();
  const isMobile = width < 768;

  const isUserFollowed = useCallback((userId) => {
    if (!currentUser?.followingIds) return false;
    return currentUser.followingIds.some(id => id === userId);
  }, [currentUser.followingIds]);

  const handleFollowToggle = useCallback(async (userId, isCurrentlyFollowed) => {
    // Dispatch follow or unfollow action based on current state
    if (isCurrentlyFollowed) {
      await dispatch(unfollowUser(userId));
      if (type === 'following') {
        await dispatch(fetchFollowing(user.id));
      }
    } else {
      await dispatch(followUser(userId));
    }
  }, [dispatch, user.id, type]);

  const handleOnDelete = useCallback(async (recipeId) => {
    // Dispatch delete action
    await dispatch(removeRecipeFromFavorites(recipeId));
    if (type === 'favorites') {
      await dispatch(fetchFavorites(user.id));
    }
  }, [dispatch, user.id, type]);

  useEffect(() => {
    switch (type) {
    case 'recipes':
      dispatch(fetchRecipes(user.id));
      break;
    case 'favorites':
      dispatch(fetchFavorites(user.id));
      break;
    case 'followers':
      dispatch(fetchFollowers(user.id));
      break;
    case 'following':
      dispatch(fetchFollowing(user.id));
      break;
    default:
      break;
    }
  }, [type, dispatch, user.id]);

  const listState = userLists[type];

  if (listState.loading) return <Loader />;
  if (listState.error) return <p>Error: {listState.error}</p>;
  if ((type === 'recipes' || type === 'favorites') && listState.items?.length === 0) return <p className={css.infoText}>Nothing has been added to your recipes list yet.
    Please browse our recipes and add your favorites for easy access in the future.</p>;
  if ((type === 'followers' || type === 'following') && listState.items?.length === 0) return <p className={css.infoText}>There are currently no followers on your account.
    Please engage our visitors with interesting content and draw their attention to your profile.</p>;

  return (
    <ul>
      {listState.items?.map((item) =>
        type === 'recipes' || type === 'favorites' ? (
          <li key={item.id}>
            <RecipesPreview
              recipe={item}
              isOwner={user.userId === currentUser.id}
              onDelete={handleOnDelete}
            />
          </li>
        ) : (
          <li key={item.id}>
            <FollowerItem
              user={item}
              isCurrent={item.id === currentUser.id}
              isFollowing={type === 'following' ? true : (isUserFollowed(item.id))}
              recipesCount={isMobile ? 0 : 3}
              onFollowToggle={handleFollowToggle}/>
          </li>
        )
      )}
    </ul>
  );
};

export default ListItems;