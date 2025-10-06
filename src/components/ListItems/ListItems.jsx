import React, { useCallback, useEffect, useMemo } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import css from './ListItems.module.css';

import { selectUser, selectFollowInProgress, selectFavoriteInProgress, followUser, unfollowUser, removeRecipeFromFavorites } from '@redux/auth/authSlice';
import { deleteRecipe } from '@redux/recipes/recipesSlice';
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

const ITEMS_PER_PAGE = 9;

const ListItems = ({ type, user }) => {
  const dispatch = useDispatch();
  const userLists = useSelector((state) => state.users);
  const listState = userLists[type];
  const currentUser = useSelector(selectUser);
  const followInProgress = useSelector(selectFollowInProgress);
  const favoriteInProgress = useSelector(selectFavoriteInProgress);

  const { width } = useViewport();
  const isMobile = width < 768;

  const isUserFollowed = useCallback((userId) => {
    if (!currentUser?.followingIds) return false;
    return currentUser.followingIds.some(id => id === userId);
  }, [currentUser.followingIds]);

  const pageForReload = useMemo(() => {
    // If we delete the last item on the current page and it's not the first page, go back one page
    if (listState.items?.length === 1 && listState.currentPage > 1) {
      return listState.currentPage - 1 || 1;
    }
    return listState.currentPage;
  }, [listState.items, listState.currentPage]);

  useEffect(() => {
    if (!user?.id) return;
    switch (type) {
    case 'recipes':
      dispatch(fetchRecipes({ userId: user.id, page: 1, limit: ITEMS_PER_PAGE }));
      break;
    case 'favorites':
      dispatch(fetchFavorites({ userId: user.id, page: 1, limit: ITEMS_PER_PAGE }));
      break;
    case 'followers':
      dispatch(fetchFollowers({ userId: user.id, page: 1, limit: ITEMS_PER_PAGE }));
      break;
    case 'following':
      dispatch(fetchFollowing({ userId: user.id, page: 1, limit: ITEMS_PER_PAGE }));
      break;
    default:
      break;
    }
  }, [type, dispatch, user?.id]);

  const handleFollowToggle = useCallback(async (userId, isCurrentlyFollowed) => {
    // Dispatch follow or unfollow action based on current state
    if (isCurrentlyFollowed) {
      await dispatch(unfollowUser(userId));
      if (type === 'following') {
        await dispatch(fetchFollowing({ userId: user.id, page: pageForReload, limit: ITEMS_PER_PAGE }));
      }
    } else {
      await dispatch(followUser(userId));
    }
  }, [dispatch, user?.id, type, pageForReload]);

  const handleOnDelete = useCallback(async (recipeId) => {
    // Dispatch delete action
    if (type === 'recipes') {
      await dispatch(deleteRecipe(recipeId));
      await dispatch(fetchRecipes({ userId: user.id, page: pageForReload, limit: ITEMS_PER_PAGE }));
    }

    if (type === 'favorites') {
      await dispatch(removeRecipeFromFavorites(recipeId));
      await dispatch(fetchFavorites({ userId: user.id, page: pageForReload, limit: ITEMS_PER_PAGE }));
    }
  }, [dispatch, user?.id, type, pageForReload]);

  const handlePageChange = useCallback((page) => {
    switch (type) {
    case 'recipes':
      dispatch(fetchRecipes({ userId: user.id, page, limit: ITEMS_PER_PAGE }));
      break;
    case 'favorites':
      dispatch(fetchFavorites({ userId: user.id, page, limit: ITEMS_PER_PAGE }));
      break;
    case 'followers':
      dispatch(fetchFollowers({ userId: user.id, page, limit: ITEMS_PER_PAGE }));
      break;
    case 'following':
      dispatch(fetchFollowing({ userId: user.id, page, limit: ITEMS_PER_PAGE }));
      break;
    default:
      break;
    }
  }, [type, dispatch, user?.id]);

  if (!listState.items?.length && listState.loading) return <Loader />;
  if (listState.error) return <p>Error: {listState.error}</p>;
  if ((type === 'recipes' || type === 'favorites') && listState.items?.length === 0) return <p className={css.infoText}>Nothing has been added to your recipes list yet.
    Please browse our recipes and add your favorites for easy access in the future.</p>;
  if ((type === 'followers' || type === 'following') && listState.items?.length === 0) return <p className={css.infoText}>There are currently no followers on your account.
    Please engage our visitors with interesting content and draw their attention to your profile.</p>;

  return (
    <div className={css.content}>
      <ul className={css.list}>
        {listState.items?.map((item) =>
          type === 'recipes' || type === 'favorites' ? (
            <li key={item.id}>
              <RecipesPreview
                recipe={item}
                isOwner={user.id === currentUser.id}
                isDeleteInProgress={type === 'favorites' ? favoriteInProgress[item.id] : false}
                onDelete={handleOnDelete}
              />
            </li>
          ) : (
            <li key={item.id}>
              <FollowerItem
                user={item}
                isCurrent={item.id === currentUser.id}
                isFollowing={type === 'following' ? true : (isUserFollowed(item.id))}
                isFollowLoading={followInProgress[item.id]}
                recipesCount={isMobile ? 0 : 3}
                onFollowToggle={handleFollowToggle}/>
            </li>
          )
        )}
      </ul>
      {listState.items && listState.items.length > 0 && (
        <div className={css.paginationWrapper}>
          <RecipePagination
            currentPage={listState.currentPage}
            totalPages={listState.totalPages}
            onPageChange={handlePageChange}
            isLoading={listState.isLoading}
            totalRecipes={listState.totalCount}
          />
        </div>
      )}
    </div>
  );
};

export default ListItems;
