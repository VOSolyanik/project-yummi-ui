import { useEffect } from 'react';

import css from './Modal.module.css';

import Icon from '../Icon/Icon';

const Modal = ({ isOpen, onClose, children }) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape' && onClose && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent background scrolling
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose, isOpen]);

  // Close on backdrop click
  const handleBackdropClick = event => {
    if (event.target === event.currentTarget && onClose) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={css.modal} onClick={handleBackdropClick}>
      <div className={css.modalContent}>
        <button className={css.closeButton} onClick={onClose} type="button" aria-label="Close modal">
          <Icon name="close" />
        </button>

        <div className={css.content}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
