import { useContext } from 'react';

import { AuthModalContext } from '../contexts/AuthModalContext.jsx';

export const useAuthModal = () => {
  const context = useContext(AuthModalContext);
  if (!context) {
    throw new Error('useAuthModal must be used within a AuthModalProvider');
  }
  return context;
};
