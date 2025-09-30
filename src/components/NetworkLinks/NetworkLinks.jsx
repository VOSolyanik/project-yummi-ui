import React from 'react';

import css from './NetworkLinks.module.css';

import Button from '../Button/Button';
import { Icon } from '../Icon/Icon';

const NetworkLinks = () => {
  const socialLinks = [
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/goITclub/',
      icon: 'facebook',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/goitclub/',
      icon: 'instagram',
    },
    {
      name: 'YouTube',
      url: 'https://www.youtube.com/c/GoIT',
      icon: 'youtube',
    },
  ];

  return (
    <ul className={css.networkLinks}>
      {socialLinks.map((link) => (
        <li key={link.name}>
          <Button
            as="a"
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            aria-label={`Visit our ${link.name} page`}
          >
            <Icon name={link.icon} size={20} />
          </Button>
        </li>
      ))}
    </ul>
  );
};

export default NetworkLinks;
