import React from 'react';

import css from './Footer.module.css';

import Copyright from '../Copyright/Copyright';
import Logo from '../Logo/Logo';
import NetworkLinks from '../NetworkLinks/NetworkLinks';

const Footer = () => {
  return (
    <footer className={css.footer}>
      <div className={'container'}>
        <div className={css.footerContent}>
          <Logo />
          <NetworkLinks />
        </div>
      </div>
      <div className={css.separator}></div>
      <div className={'container'}>
        <Copyright />
      </div>
    </footer>
  );
};

export default Footer;
