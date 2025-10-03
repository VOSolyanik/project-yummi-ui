import React, { useEffect }  from 'react';

import { useDispatch, useSelector } from 'react-redux';

import css from './ListItems.module.css';

import RecipesPreview from '../RecipesPreview';

import { selectUser } from '@/redux/auth/authSlice';
import {
  fetchRecipes,
  fetchFavorites,
  fetchFollowers,
  fetchFollowing
} from '@/redux/users/usersSlice';


const ListItems = ({ type }) => {
  const dispatch = useDispatch();
  const userLists = useSelector((state) => state.users);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (!user?.id) return;

    switch (type) {
    case 'recipes':
      if (userLists.recipes.items === null || !userLists.recipes.items) dispatch(fetchRecipes(user.id));
      break;
    case 'favorites':
      if (userLists.favorites.items === null || !userLists.recipes.items) dispatch(fetchFavorites(user.id));
      break;
    case 'followers':
      if (userLists.followers.items === null || !userLists.recipes.items) dispatch(fetchFollowers(user.id));
      break;
    case 'following':
      if (userLists.following.items === null || !userLists.recipes.items) dispatch(fetchFollowing(user.id));
      break;
    default:
      break;
    }
  }, [type, dispatch, user.id]); 

  const listState = userLists[type];

  if (listState.loading) return <p>Loading...</p>;
  if (listState.error) return <p>Error: {listState.error}</p>;
  if ((type === 'recipes' || type === 'favorites') && listState.items?.length === 0) return <p className={css.infoText}>Nothing has been added to your recipes list yet. 
    Please browse our recipes and add your favorites for easy access in the future.</p>;
  if ((type === 'followers' || type === 'following') && listState.items?.length === 0) return <p>There are currently no followers on your account. 
    Please engage our visitors with interesting content and draw their attention to your profile.</p>;

  return (
    <ul>
      {listState.items?.map((item) =>
        type === 'recipes' || type === 'favorites' ? (
          <li key={item.id}><RecipesPreview/></li>
        ) : (
          <li key={item.id}>{item.name}</li>
        )
      )}
    </ul>
  );
};

export default ListItems;