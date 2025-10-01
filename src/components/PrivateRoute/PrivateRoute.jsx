import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { setPendingPrivateRoute } from '@redux/router/routerSlice';

import { useAuth } from '@hooks/useAuth.js';
import { useAuthModal } from '@hooks/useAuthModal.js';
import { useRouteTracker } from '@hooks/useRouteTracker.js';

import Loader from '../Loader/Loader';

/**
 * Component for protecting private routes
 * Opens sign-in modal if user is not authenticated
 * User remains on current public page
 */
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const { openSignInModal, currentModal } = useAuthModal();
  const { previousPath, currentPath, pendingPrivateRoute } = useRouteTracker();

  const dispatch = useDispatch();

  console.log(previousPath, currentPath, pendingPrivateRoute);
  useEffect(() => {

    // If user is not authenticated and not loading
    // and modal is not yet open and this is not the same page already being handled
    if (!isAuthenticated && !isLoading && !currentModal && pendingPrivateRoute && pendingPrivateRoute !== currentPath) {
      // Store the requested private route in Redux
      dispatch(setPendingPrivateRoute(currentPath));

      // Open sign-in modal with redirect page information
      openSignInModal({ redirectTo: currentPath });
    }
  }, [
    isAuthenticated,
    isLoading,
    currentModal,
    pendingPrivateRoute,
    currentPath,
    dispatch,
    openSignInModal
  ]);

  // Show loader during authentication check
  if (isLoading) {
    return <Loader />;
  }

  // If user is not authenticated, return null
  // (modal opens in useEffect, user remains on current page)
  if (!isAuthenticated) {
    return <Navigate to={previousPath} />;
  }

  // If user is authenticated, render child components
  return children;
};

export default PrivateRoute;
