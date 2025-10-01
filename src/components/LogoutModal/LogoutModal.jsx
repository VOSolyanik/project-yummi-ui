import css from './LogoutModal.module.css';

import { useAuth } from '@hooks/useAuth.js';

import Button from '../Button/Button';
import Modal from '../Modal/Modal';

const LogoutModal = ({ isOpen, onSuccess, onClose }) => {
  const { logout, isLoading } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      if (onSuccess) {
        onSuccess();
      }
      onClose();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={css.content}>
        <h2 className={css.title}>Log out?</h2>
        <p className={css.subtitle}>You can always log back in at any time.</p>

        <div className={css.buttonGroup}>
          <Button
            onClick={handleLogout}
            disabled={isLoading}
            size="large"
          >
            LOG OUT
          </Button>

          <Button
            onClick={onClose}
            variant="outline"
            size="large"
          >
            CANCEL
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default LogoutModal;
