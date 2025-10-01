import clsx from 'clsx';

import css from './Icon.module.css';

export const Icon = ({
  name,
  className,
  size = 24,
  color = 'currentColor',
  ...props
}) => {
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
