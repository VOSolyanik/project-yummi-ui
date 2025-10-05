import React, { useCallback, useEffect, useMemo } from 'react';

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
import RecipePagination from '../RecipePagination/RecipePagination';
import RecipesPreview from '../RecipesPreview';

const MOBILE_ITEMS_PER_PAGE = 8;
const DESKTOP_ITEMS_PER_PAGE = 12;

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

  const itemsPerPage = useMemo(() => {
    return isMobile
      ? MOBILE_ITEMS_PER_PAGE
      : DESKTOP_ITEMS_PER_PAGE;
  }, [isMobile]);

  useEffect(() => {
    switch (type) {
    case 'recipes':
      dispatch(fetchRecipes({ userId: user.id, page: 1, limit: itemsPerPage }));
      break;
    case 'favorites':
      dispatch(fetchFavorites({ userId: user.id, page: 1, limit: itemsPerPage }));
      break;
    case 'followers':
      dispatch(fetchFollowers({ userId: user.id, page: 1, limit: itemsPerPage }));
      break;
    case 'following':
      dispatch(fetchFollowing({ userId: user.id, page: 1, limit: itemsPerPage }));
      break;
    default:
      break;
    }
  }, [type, dispatch, user.id, itemsPerPage]);

  const handlePageChange = useCallback((page) => {
    // dispatch(fetchRecipes({
    //   categoryId,
    //   page,
    //   limit: itemsPerPage,
    //   ingredient: selectedIngredient?.id || null,
    //   area: selectedArea?.id || null
    // }));
    switch (type) {
    case 'recipes':
      dispatch(fetchRecipes({ userId: user.id, page, limit: itemsPerPage }));
      break;
    case 'favorites':
      dispatch(fetchFavorites({ userId: user.id, page, limit: itemsPerPage }));
      break;
    case 'followers':
      dispatch(fetchFollowers({ userId: user.id, page, limit: itemsPerPage }));
      break;
    case 'following':
      dispatch(fetchFollowing({ userId: user.id, page, limit: itemsPerPage }));
      break;
    default:
      break;
    }
  }, [type, dispatch, user.id, itemsPerPage]);

  const listState = userLists[type];

  if (listState.loading) return <Loader />;
  if (listState.error) return <p>Error: {listState.error}</p>;
  if ((type === 'recipes' || type === 'favorites') && listState.items?.length === 0) return <p className={css.infoText}>Nothing has been added to your recipes list yet.
    Please browse our recipes and add your favorites for easy access in the future.</p>;
  if ((type === 'followers' || type === 'following') && listState.items?.length === 0) return <p className={css.infoText}>There are currently no followers on your account.
    Please engage our visitors with interesting content and draw their attention to your profile.</p>;

  return (
    <div className={css.content}>
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
      {listState.items && listState.items.length > 0 && (
        <RecipePagination
          currentPage={listState.currentPage}
          totalPages={listState.totalPages}
          onPageChange={handlePageChange}
          isLoading={listState.isLoading}
          totalRecipes={listState.totalCount}
        />
      )}
      
      {/* {listState.items && listState.items.length > 0 && type === 'recipes' && (
        <RecipePagination
          currentPage={recipes.currentPage}
          totalPages={recipes.totalPages}
          onPageChange={handlePageChange}
          isLoading={recipes.isLoading}
          totalRecipes={recipes.totalRecipes}
        />
      )}
      {listState.items && listState.items.length > 0 && type === 'favorites' && (
        <RecipePagination
          currentPage={favorites.currentPage}
          totalPages={favorites.totalPages}
          onPageChange={handlePageChange}
          isLoading={favorites.isLoading}
          totalRecipes={favorites.totalRecipes}
        />
      )}
      {listState.items && listState.items.length > 0 && type === 'followers' && (
        <RecipePagination
          currentPage={followers.currentPage}
          totalPages={followers.totalPages}
          onPageChange={handlePageChange}
          isLoading={followers.isLoading}
          totalRecipes={followers.totalRecipes}
        />
      )}
      {listState.items && listState.items.length > 0 && type === 'following' && (
        <RecipePagination
          currentPage={following.currentPage}
          totalPages={following.totalPages}
          onPageChange={handlePageChange}
          isLoading={following.isLoading}
          totalRecipes={following.totalRecipes}
        />
      )} */}
    </div>
  );
};

export default ListItems;
