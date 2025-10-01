import React from 'react';

import { Outlet, useLocation } from 'react-router-dom';

import css from './SharedLayout.module.css';

import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const SharedLayout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  return (
    <div className={css.layout}>
      <Header inverse={isHomePage} />
      <main className={css.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default SharedLayout;
