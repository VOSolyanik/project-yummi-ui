import clsx from 'clsx';

import css from './Icon.module.css';

export const Icon = ({ name, src, className, size = 24, ...props }) => {
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        width={size}
        height={size}
        className={clsx(css.icon, className)}
        {...props}
      />
    );
  }

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