import { BeatLoader } from 'react-spinners';

import css from './Loader.module.css';

const Loader = () => {
  return (
    <div className={css.loader}>
      <BeatLoader loading={true} size={16} color="#D84343" />
    </div>
  );
};

export default Loader;
