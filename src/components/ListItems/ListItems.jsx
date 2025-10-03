import React, { useEffect }  from 'react';

import { useDispatch, useSelector } from 'react-redux';

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
  const lists = useSelector((state) => state.lists);
  const user = useSelector(selectUser);

  useEffect(() => {
    if (type === 'recipes') dispatch(fetchRecipes(user.id));
    if (type === 'favorites') dispatch(fetchFavorites(user.id));
    if (type === 'followers') dispatch(fetchFollowers(user.id));
    if (type === 'following') dispatch(fetchFollowing(user.id));
  }, [type, dispatch, user.id]);

  const listState = lists[type];

  if (listState.loading) return <p>Loading...</p>;
  if (listState.error) return <p>Error: {listState.error}</p>;
  if (!listState.items.length) return <p>No {type} found.</p>;

  return (
    <ul>
      {listState.items.map((item) =>
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