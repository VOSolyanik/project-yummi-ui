import React from 'react';

import css from './UserInfoCard.module.css';

import { Icon } from '../Icon/Icon';

const UserInfoCard = () => {
  return (
    <div className={css.card}>
      <div className={css.thumb}>
        <div className={css.avatarWrapper}>
          <img className={css.img} src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Phoenicopterus_ruber_in_S%C3%A3o_Paulo_Zoo.jpg" alt="" />
        </div>
        <div className={css.addBtn}>
          <Icon name={'plus'} size={18} className={css.icon}></Icon>
        </div>
      </div>
      <div className={css.userName}>
        <p>Mock-Name</p>
      </div>
      <ul className={css.userInfoList}>
        <li className={css.userInfoItem}>
          <span>Email: </span>
          <span className={css.data}>mock-test@test.com</span>
        </li>
        <li className={css.userInfoItem}>
          <span>Added recipes: </span>
          <span className={css.data}>mock-9</span>
        </li>
        <li className={css.userInfoItem}>
          <span>Favorites: </span>
          <span className={css.data}>mock-9</span>
        </li>
        <li className={css.userInfoItem}>
          <span>Followers: </span>
          <span className={css.data}>mock-9</span>
        </li>
        <li className={css.userInfoItem}>
          <span>Following: </span>
          <span className={css.data}>mock-9</span>
        </li>
      </ul>
    </div>
  );
};

export default UserInfoCard;