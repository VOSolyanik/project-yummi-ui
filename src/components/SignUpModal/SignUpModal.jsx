import css from './SignUpModal.module.css';

import { useAuth } from '@hooks/useAuth.js';

import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import SignUpForm from '../SignUpForm/SignUpForm';

const SignUpModal = ({ isOpen, onClose, onSwitchToSignIn, onSuccess }) => {
  const { register, isLoading } = useAuth();

  const handleSignUp = async (values, { setSubmitting }) => {
    try {
      const result = await register(values);
      if (result && (result.user || result.token || result === true)) {
        onSuccess?.();
      }
    } catch (error) {
      console.error('Sign up error:', error);
      // Error toast will be shown by the auth system
    } finally {
      setSubmitting(false);
    }
  };

  const handleSwitchToSignIn = () => {
    if (onSwitchToSignIn) {
      onSwitchToSignIn();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Sign Up">
      <h2 className={css.title}>Sign Up</h2>
      <div className={css.content}>
        <SignUpForm onSubmit={handleSignUp} isLoading={isLoading} />

        <div className={css.caption}>
          <span>
            I already have an account?
          </span>
          <Button
            type="button"
            variant=""
            size=""
            onClick={handleSwitchToSignIn}
            className={css.switchButton}
          >
            Sign in
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default SignUpModal;
