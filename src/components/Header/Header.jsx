import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import clsx from 'clsx';

import css from './Header.module.css';

import { useAuth } from '@hooks/useAuth.js';
import { useAuthModal } from '@hooks/useAuthModal.js';

import AuthBar from '../AuthBar/AuthBar';
import Logo from '../Logo/Logo';
import NavBar from '../NavBar/NavBar';
import UserBar from '../UserBar/UserBar';

const Header = ({ inverse = false }) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const { openSignInModal, openSignUpModal, openLogoutModal } = useAuthModal();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  const handleSignInClick = () => {
    openSignInModal();
  };

  const handleSignUpClick = () => {
    openSignUpModal();
  };

  const handleProfileClick = () => {
    navigate('/user/me');
  };

  const handleLogoutClick = () => {
    openLogoutModal();
  };

  return (
    <header className={clsx(css.header, inverse && css.inverse)}>
      <div className={clsx('container', css.container)}>
        <Logo className={css.logo} inverse={inverse} />

        <div className={css.authWrapper}>
          {isLoading ? null : isAuthenticated ? (
            <UserBar
              user={user}
              onProfileClick={handleProfileClick}
              onLogoutClick={handleLogoutClick}
              inverse={inverse}
            />
          ) : (
            <AuthBar onSignInClick={handleSignInClick} onSignUpClick={handleSignUpClick} inverse={inverse} />
          )}
        </div>

        {(isAuthenticated || !isMobile) && (
          <div className={css.navWrapper}>
            {/* Always show Nav for development */}
            <NavBar isAuthenticated={isAuthenticated} isMobile={isMobile} inverse={inverse} />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
