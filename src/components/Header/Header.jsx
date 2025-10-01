import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import clsx from 'clsx';

import css from './Header.module.css';

import AuthBar from '../AuthBar/AuthBar';
import Logo from '../Logo/Logo';
import NavBar from '../NavBar/NavBar';
import UserBar from '../UserBar/UserBar';

const Header = ({ inverse = false }) => {
  // TODO: Replace with actual authentication logic
  const [isAuthenticated] = useState(true);
  const [user] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

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
    // TODO: Open SignInModal
    console.log('Open SignIn Modal');
  };

  const handleSignUpClick = () => {
    // TODO: Open SignUpModal
    console.log('Open SignUp Modal');
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleLogoutClick = () => {
    // TODO: Open LogOutModal
    console.log('Open Logout Modal');
  };

  return (
    <header className={clsx(css.header, inverse && css.inverse)}>
      <div className={clsx('container', css.container)}>
        <Logo className={css.logo} inverse={inverse} />

        <div className={css.authWrapper}>
          {isAuthenticated ? (
            <UserBar
              user={user}
              onProfileClick={handleProfileClick}
              onLogoutClick={handleLogoutClick}
              inverse={inverse}
            />
          ) : (
            <AuthBar
              onSignInClick={handleSignInClick}
              onSignUpClick={handleSignUpClick}
              inverse={inverse}
            />
          )}
        </div>

        {(isAuthenticated || !isMobile) && (
          <div className={css.navWrapper}>
            {/* Always show Nav for development */}
            <NavBar
              isAuthenticated={isAuthenticated}
              isMobile={isMobile}
              inverse={inverse}
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
