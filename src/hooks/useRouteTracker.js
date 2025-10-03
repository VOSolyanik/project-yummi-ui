import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import {
  selectCurrentPath,
  selectPreviousPath,
  selectPendingPrivateRoute,
  selectIsNavigating,
  setCurrentPath
} from '../redux/router/routerSlice';

/**
 * Custom hook for accessing route tracking data from Redux store
 * Also handles automatic route tracking when used
 * @param {boolean} enableTracking - Whether to automatically track route changes (default: false)
 * @returns {object} Route tracking data and utilities
 */
export const useRouteTracker = (enableTracking = false) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const currentPath = useSelector(selectCurrentPath);
  const previousPath = useSelector(selectPreviousPath);
  const pendingPrivateRoute = useSelector(selectPendingPrivateRoute);
  const isNavigating = useSelector(selectIsNavigating);

  // Auto-track route changes if enabled
  useEffect(() => {
    if (enableTracking) {
      const currentPath = location.pathname + location.search;
      dispatch(setCurrentPath(currentPath));
    }
  }, [location.pathname, location.search, dispatch, enableTracking]);

  return {
    currentPath,
    previousPath,
    pendingPrivateRoute,
    isNavigating,
    // Utility functions
    isOnPath: path => currentPath === path,
    wasPreviouslyOn: path => previousPath === path,
    hasPendingRoute: () => !!pendingPrivateRoute,
    // Manual tracking function
    updateCurrentPath: path => dispatch(setCurrentPath(path))
  };
};
