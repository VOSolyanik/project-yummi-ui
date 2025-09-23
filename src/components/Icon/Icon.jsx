import clsx from 'clsx';

import css from './Icon.module.css';

export const Icon = ({ name, className, size = 24, ...props }) => {
  return (
    <svg
      className={clsx(css.icon, className)}
      width={size}
      height={size}
      {...props}
    >
      <use href={`/sprite.svg#icon-${name}`} />
    </svg>
  );
};