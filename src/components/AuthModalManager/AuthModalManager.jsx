import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { clearPendingPrivateRoute, selectPendingPrivateRoute } from '@redux/router/routerSlice';


import { MODAL_TYPES } from '@constants/modalTypes.js';

import { useAuthModal } from '@hooks/useAuthModal.js';

import LogoutModal from '../LogoutModal/LogoutModal';
import SignInModal from '../SignInModal/SignInModal';
import SignUpModal from '../SignUpModal/SignUpModal';

const AuthModalManager = () => {
  const { currentModal, closeModal, switchToSignUp, switchToSignIn, modalProps } = useAuthModal();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pendingPrivateRoute = useSelector(selectPendingPrivateRoute);

  const handleSignInSuccess = () => {
    closeModal();
    dispatch(clearPendingPrivateRoute());

    // Navigate to intended page (either from modalProps or from Redux store)
    const redirectTo = modalProps.redirectTo || pendingPrivateRoute;
    if (redirectTo) {
      navigate(redirectTo, { replace: true });
    }
  };

  const handleSignUpSuccess = () => {
    closeModal();
    dispatch(clearPendingPrivateRoute());

    // Navigate to intended page (either from modalProps or from Redux store)
    const redirectTo = modalProps.redirectTo || pendingPrivateRoute;
    if (redirectTo) {
      navigate(redirectTo, { replace: true });
    }
  };

  const handleModalClose = () => {
    closeModal();
    dispatch(clearPendingPrivateRoute());
    // If user closes modal without authenticating, stay on current page
    // No navigation needed - user remains where they were
  };

  const handleLogoutSuccess = () => {
    navigate('/');
  };

  if (!currentModal) return null;

  switch (currentModal) {
  case MODAL_TYPES.SIGN_IN:
    return (
      <SignInModal
        isOpen={true}
        onClose={handleModalClose}
        onSwitchToSignUp={switchToSignUp}
        onSuccess={handleSignInSuccess}
      />
    );

  case MODAL_TYPES.SIGN_UP:
    return (
      <SignUpModal
        isOpen={true}
        onClose={handleModalClose}
        onSwitchToSignIn={switchToSignIn}
        onSuccess={handleSignUpSuccess}
      />
    );

  case MODAL_TYPES.LOGOUT:
    return (
      <LogoutModal
        isOpen={true}
        onClose={closeModal}
        onSuccess={handleLogoutSuccess}
      />
    );

  default:
    return null;
  }
};

export default AuthModalManager;
