import React, { useState, useRef, useEffect } from 'react';

import clsx from 'clsx';

import css from './UserBar.module.css';

import Button from '../Button/Button';
import { Icon } from '../Icon/Icon';

const UserBar = ({ user, onProfileClick, onLogoutClick, inverse = false }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleProfileClick = () => {
    setIsDropdownOpen(false);
    if (onProfileClick) onProfileClick();
  };

  const handleLogoutClick = () => {
    setIsDropdownOpen(false);
    if (onLogoutClick) onLogoutClick();
  };

  // Handle escape key to close dropdown
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isDropdownOpen) {
        setIsDropdownOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isDropdownOpen]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !buttonRef.current?.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Focus first menu item when dropdown opens
  useEffect(() => {
    if (isDropdownOpen && dropdownRef.current) {
      const firstMenuItem = dropdownRef.current.querySelector('[role="menuitem"]');
      firstMenuItem?.focus();
    }
  }, [isDropdownOpen]);

  return (
    <div
      className={clsx(css.userBar, inverse && css.inverse)}
      aria-label="User menu navigation"
    >
      <button
        ref={buttonRef}
        type="button"
        className={css.userButton}
        onClick={handleToggleDropdown}
        aria-label="Open user menu"
        aria-expanded={isDropdownOpen}
        aria-haspopup="menu"
        aria-controls="user-dropdown-menu"
      >
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt={user?.name || 'User'}
            className={css.userAvatar}
          />
        ) : (
          <div className={css.userInitial}>
            {(user?.name || 'U').charAt(0).toUpperCase()}
          </div>
        )}
        <span className={css.userName}>{user?.name || 'User'}</span>
        <Icon
          name="arrow-down"
          size={16}
          className={clsx(css.userDropdownIcon, {
            [css.rotated]: isDropdownOpen,
          })}
          aria-hidden="true"
        />
      </button>

      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          id="user-dropdown-menu"
          className={css.userDropdown}
          role="menu"
          aria-label="User account options"
        >
          <ul className={css.userDropdownMenu} role="none">
            <li role="none">
              <button
                onClick={handleProfileClick}
                className={css.menuItem}
                role="menuitem"
                type="button"
              >
                PROFILE
              </button>
            </li>
            <li role="none">
              <button
                onClick={handleLogoutClick}
                className={`${css.menuItem} logout-item`}
                role="menuitem"
                type="button"
              >
                <span>LOG OUT</span>
                <Icon
                  name="arrow-up-right"
                  size={16}
                  aria-hidden="true"
                />
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserBar;
