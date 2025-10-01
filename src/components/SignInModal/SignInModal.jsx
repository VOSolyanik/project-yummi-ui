import { useNavigate } from 'react-router-dom';

import css from './SignInModal.module.css';

import { useAuth } from '@hooks/useAuth.js';

import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import SignInForm from '../SignInForm/SignInForm';

const SignInModal = ({ isOpen, onClose, onSwitchToSignUp, onSuccess }) => {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSignIn = async (values, { setSubmitting }) => {
    try {
      await login(values);
      if (onSuccess) {
        onSuccess();
      } else {
        if (onClose) onClose();
        navigate('/');
      }
    } catch (error) {
      console.error('Sign in error:', error);
      // Error toast will be shown by the auth system
    } finally {
      setSubmitting(false);
    }
  };

  const handleSwitchToSignUp = () => {
    if (onSwitchToSignUp) {
      onSwitchToSignUp();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Sign In">
      <h2 className={css.title}>Sign In</h2>
      <div className={css.content}>
        <SignInForm onSubmit={handleSignIn} isLoading={isLoading} />

        <div className={css.caption}>
          <span>
            Don&apos;t have an account?
          </span>
          <Button
            type="button"
            variant=""
            size=""
            onClick={handleSwitchToSignUp}
            className={css.switchButton}
          >
            Create an account
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default SignInModal;
