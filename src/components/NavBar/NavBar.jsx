import React, { useState } from 'react';

import { NavLink } from 'react-router-dom';

import clsx from 'clsx';

import css from './NavBar.module.css';

import { Icon } from '../Icon/Icon';

const NavBar = ({
  isMobile = false,
  inverse = false,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleToggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { to: '/', label: 'Home' },
    ...(import.meta.env.VITE_SHOW_UI_KIT === 'true' ? [{ to: '/uikit', label: 'UI Kit' }] : []),
    { to: '/add', label: 'Add recipe' },
  ];

  if (isMobile) {
    return (
      <button
        className={clsx(css.burgerButton, inverse && css.inverse)}
        onClick={handleToggleMobileMenu}
        aria-label="Open navigation menu"
      >
        <Icon name="menu" />
      </button>
    );
  }

  return (
    <nav className={clsx(css.nav, inverse && css.inverse)}>
      <ul className={css.navList}>
        {navItems.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                clsx(css.navLink, {
                  [css.activeLink]: isActive,
                  [css.inverseLink]: inverse,
                })
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
