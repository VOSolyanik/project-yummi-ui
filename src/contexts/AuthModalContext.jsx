import { createContext, useState, useCallback, useMemo } from 'react';

import { MODAL_TYPES } from '../constants/modalTypes.js';

const AuthModalContext = createContext();

const AuthModalProvider = ({ children }) => {
  const [currentModal, setCurrentModal] = useState(null);
  const [modalProps, setModalProps] = useState({});

  const openSignInModal = useCallback((props = {}) => {
    setCurrentModal(MODAL_TYPES.SIGN_IN);
    setModalProps(props);
  }, []);

  const openSignUpModal = useCallback((props = {}) => {
    setCurrentModal(MODAL_TYPES.SIGN_UP);
    setModalProps(props);
  }, []);

  const openLogoutModal = useCallback((props = {}) => {
    setCurrentModal(MODAL_TYPES.LOGOUT);
    setModalProps(props);
  }, []);

  const closeModal = useCallback(() => {
    setCurrentModal(null);
    setModalProps({});
  }, []);

  const switchToSignUp = useCallback(() => {
    setCurrentModal(MODAL_TYPES.SIGN_UP);
    // Keep any existing props
  }, []);

  const switchToSignIn = useCallback(() => {
    setCurrentModal(MODAL_TYPES.SIGN_IN);
    // Keep any existing props
  }, []);

  const value = useMemo(() => ({
    currentModal,
    modalProps,
    openSignInModal,
    openSignUpModal,
    openLogoutModal,
    closeModal,
    switchToSignUp,
    switchToSignIn
  }), [
    currentModal,
    modalProps,
    openSignInModal,
    openSignUpModal,
    openLogoutModal,
    closeModal,
    switchToSignUp,
    switchToSignIn
  ]);

  return (
    <AuthModalContext.Provider value={value}>
      {children}
    </AuthModalContext.Provider>
  );
};

export { AuthModalContext, AuthModalProvider };
