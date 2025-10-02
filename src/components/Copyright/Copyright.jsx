import React from 'react';

import css from './Copyright.module.css';

const Copyright = () => {
  const currentYear = new Date().getFullYear();

  return <p className={css.copyright}>@{currentYear}, Foodies. All rights reserved</p>;
};

export default Copyright;
