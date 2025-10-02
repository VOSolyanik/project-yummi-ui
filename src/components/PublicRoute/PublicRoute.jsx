import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '@hooks/useAuth.js';

/**
 * Component for public routes (login, registration)
 * Redirects authenticated users to main page
 */
const PublicRoute = ({ children, restricted = false }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // If route is restricted and user is authenticated
  if (restricted && isAuthenticated) {
    // Redirect to the page user came from, or to home page
    const from = location.state?.from?.pathname || '/';
    return <Navigate to={from} replace />;
  }

  return children;
};

export default PublicRoute;
