import { Link } from 'react-router-dom';

import css from './PathInfo.module.css';

export default function PathInfo({
  current,
  homeTo = '/',
  homeLabel = 'Home',
  className = ''
}) {
  return (
    <nav aria-label="Breadcrumb" className={`${css.wrapper} ${className}`}>
      <ol className={`${css.list} ${css.base}`}>
        <li>
          <Link to={homeTo} className={css.homeLink}>
            {homeLabel}
          </Link>
        </li>
        <li className={css.sep} aria-hidden="true">/</li>
        <li className={css.current} aria-current="page">
          {current}
        </li>
      </ol>
    </nav>
  );
}
