import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import clsx from 'clsx';

import { useAuth } from '@contexts/AuthContext';
import Button from '@components/Button/Button';
import LoginForm from '@components/LoginForm/LoginForm';
import RegisterForm from '@components/RegisterForm/RegisterForm';
import LogoutModal from '@components/LogoutModal/LogoutModal';

import css from './Header.module.css';

import logoSvg from '@assets/images/logo.svg';

const Header = () => {
  const { isAuthenticated, user } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <>
      <header className={css.header}>
        <div className={clsx('container', css.container)}>
          <Link to="/" className={css.logo}>
            <img src={logoSvg} alt="Yummi" />
          </Link>
          
          <div className={css.authSection}>
            {isAuthenticated ? (
              <div className={css.authenticatedUser}>
                <span className={css.welcomeText}>
                  Welcome, {user?.name || 'User'}!
                </span>
                <Button
                  onClick={() => setShowLogoutModal(true)}
                  className={css.logoutButton}
                >
                  Log out
                </Button>
              </div>
            ) : (
              <div className={css.authButtons}>
                <Button
                  onClick={() => setShowLoginModal(true)}
                  variant="secondary"
                  className={css.loginButton}
                >
                  Sign in
                </Button>
                <Button
                  onClick={() => setShowRegisterModal(true)}
                  className={css.registerButton}
                >
                  Sign up
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Модальні вікна */}
      {showLoginModal && (
        <LoginForm 
          onClose={() => setShowLoginModal(false)}
          onSwitchToRegister={() => {
            setShowLoginModal(false);
            setShowRegisterModal(true);
          }}
        />
      )}
      
      {showRegisterModal && (
        <RegisterForm 
          onClose={() => setShowRegisterModal(false)}
          onSwitchToLogin={() => {
            setShowRegisterModal(false);
            setShowLoginModal(true);
          }}
        />
      )}
      
      <LogoutModal 
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
      />
    </>
  );
};

export default Header;
