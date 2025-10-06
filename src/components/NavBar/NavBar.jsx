import React, { useState, useEffect } from 'react';

import { NavLink, useLocation } from 'react-router-dom';

import clsx from 'clsx';

import css from './NavBar.module.css';

import bigMobile from '@assets/images/hero/big-mobile.webp';
import bigMobile2x from '@assets/images/hero/big-mobile@2x.webp';
import smallMobile from '@assets/images/hero/small-mobile.webp';
import smallMobile2x from '@assets/images/hero/small-mobile@2x.webp';

import Icon from '../Icon/Icon';
import Logo from '../Logo/Logo';
import PrivateLink from '../PrivateLink/PrivateLink';

const navItems = [
  { to: '/', label: 'Home' },
  ...(import.meta.env.VITE_SHOW_UI_KIT === 'true' ? [{ to: '/uikit', label: 'UI Kit' }] : []),
  { to: '/recipe/add', label: 'Add recipe', isPrivate: true }
];

const NavMenuList = ({ className = '', inverse = false }) => {
  return (
    <ul className={clsx(css.navList, className, inverse && css.inverse)}>
      {navItems.map(item => (
        <li key={item.to}>
          {item.isPrivate ? (
            // For private links will using PrivateLink
            <PrivateLink
              as={NavLink}
              to={item.to}
              className={({ isActive }) =>
                clsx(css.navLink, {
                  [css.activeLink]: isActive
                })
              }
            >
              {item.label}
            </PrivateLink>
          ) : (
            // For public links will using NavLink
            <NavLink
              to={item.to}
              state='global'
              className={({ isActive }) =>
                clsx(css.navLink, {
                  [css.activeLink]: isActive
                })
              }
            >
              {item.label}
            </NavLink>
          )}
        </li>
      ))}
    </ul>
  );
};


const NavBar = ({ inverse = false }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    // Close mobile menu on route change
    closeMobileMenu();
  }, [location.pathname]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = e => {
      if (e.key === 'Escape') {
        closeMobileMenu();
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <nav className={clsx(css.nav, inverse && css.inverse)}>
      <button
        className={css.menuToggleButton}
        onClick={toggleMobileMenu}
        aria-label="Open menu"
        aria-expanded={isMobileMenuOpen}
        aria-controls="menu-panel"
      >
        <Icon name="menu" />
      </button>
      {/* Desktop menu */}
      <NavMenuList className={css.desktopMenu} inverse={inverse} />

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className={css.overlay} role="dialog" aria-modal="true">
          <div id="menu-panel" className={css.menuPanel}>
            <div className={clsx(css.menuContainer, 'container')}>
              <div className={css.menuHeader}>
                {/* Logo */}
                <Logo inverse={true} />
                {/* Close button */}
                <button className={css.menuCloseButton} onClick={closeMobileMenu} aria-label="Close menu">
                  <Icon name="close" />
                </button>
              </div>
              <NavMenuList className={css.mobileMenu} inverse={true} />
              <div className={css.mobileImages} aria-hidden="true">
                <img
                  className={css.smallImage}
                  src={smallMobile}
                  srcSet={`${smallMobile} 1x, ${smallMobile2x} 2x`}
                  alt=""
                  loading="lazy"
                />
                <img
                  className={css.bigImage}
                  src={bigMobile}
                  srcSet={`${bigMobile} 1x, ${bigMobile2x} 2x`}
                  alt=""
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
