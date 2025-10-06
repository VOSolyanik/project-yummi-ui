import clsx from 'clsx';

import css from './Icon.module.css';

const Icon = ({
  name,
  className,
  size = 24,
  ...props
}) => {
  return (
    <svg
      className={clsx(css.icon, className, name === 'loader' && css.loader)}
      width={size}
      height={size}
      {...props}
    >
      <use href={`/sprite.svg#${name}`} />
    </svg>
  );
};

export default Icon;