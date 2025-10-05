import { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { validateToken } from '@redux/auth/authSlice.js';

const AppBootstrap = ({ children }) => {
  const dispatch = useDispatch();
  const { user, token, isLoading } = useSelector(state => state.auth);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Validate token if we have one in Redux store but no user data
    if (token && !user && !isLoading) {
      console.log('Validating stored token and fetching user data...');
      dispatch(validateToken());
    }
    if ((!token && !user) || (token && user)) {
      setIsInitialized(true);
    }
  }, [dispatch, user, token, isLoading]);

  if (!isInitialized) return null;

  return children;
};

export default AppBootstrap;
