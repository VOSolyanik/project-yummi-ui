import { useState } from 'react';

import css from './LogoutModal.module.css';

import { useAuth } from '@hooks/useAuth.js';

import Button from '../Button/Button';
import Modal from '../Modal/Modal';

const LogoutModal = ({ isOpen, onSuccess, onClose }) => {
  const { logout } = useAuth();
  const [busy, setBusy] = useState(false);

  const handleLogout = async () => {
    try {
      setBusy(true);
      await logout();
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setBusy(false);
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
            disabled={busy}
            aria-busy={busy}
            size="large"
          >
            {busy ? 'Logging out...' : 'Log out'}
          </Button>

          <Button
            onClick={onClose}
            variant="outline"
            size="large"
            disabled={busy}
          >
            CANCEL
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default LogoutModal;
