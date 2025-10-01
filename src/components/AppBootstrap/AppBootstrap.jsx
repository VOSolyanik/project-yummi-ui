import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { validateToken } from '../../redux/auth/authSlice.js';

const AppBootstrap = ({ children }) => {
  const dispatch = useDispatch();
  const { user, token, isLoading } = useSelector(state => state.auth);

  useEffect(() => {
    // Validate token if we have one in Redux store but no user data
    if (token && !user && !isLoading) {
      console.log('Validating stored token and fetching user data...');
      dispatch(validateToken());
    }
  }, [dispatch, user, token, isLoading]);

  return children;
};

export default AppBootstrap;
