import clsx from 'clsx';

import css from './Icon.module.css';

export const Icon = ({
  name,
  src,
  className,
  size = 24,
  color = 'currentColor',
  ...props
}) => {
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
      fill={color}
      {...props}
    >
      <use href={`/sprite.svg#${name}`} />
    </svg>
  );
};
