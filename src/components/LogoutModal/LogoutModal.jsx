import { useEffect } from 'react';
import { useAuthActions } from '../../hooks/useAuthActions';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';
import classes from './LogoutModal.module.css';

const LogoutModal = ({ isOpen, onClose }) => {
  const { logout } = useAuthActions();
  const { isLoading } = useAuth();

  // Закриття по Escape
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && onClose && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose, isOpen]);

  const handleLogout = async () => {
    try {
      await logout();
      onClose();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Закриття по backdrop
  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget && onClose) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={classes.modal} onClick={handleBackdropClick}>
      <div className={classes.modalContent}>
        <button 
          className={classes.closeButton}
          onClick={onClose}
          type="button"
        >
          <Icon name="close" />
        </button>
        
        <h2 className={classes.title}>ARE YOU LOGGING OUT?</h2>
        <p className={classes.subtitle}>You can always log back in at any time.</p>
        
        <div className={classes.buttonGroup}>
          <Button
            onClick={handleLogout}
            disabled={isLoading}
            className={classes.logoutButton}
          >
            LOG OUT
          </Button>
          
          <Button
            onClick={onClose}
            variant="secondary"
            className={classes.cancelButton}
          >
            CANCEL
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
