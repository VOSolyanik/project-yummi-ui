import React, { useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import css from './UserInfoCard.module.css';

import noAvatarImg from '@assets/images/no-avatar.webp';

import Button from '../Button/Button';
import Icon from '../Icon/Icon';

import { uploadAvatar, selectUser } from '@/redux/auth/authSlice';



const UserInfoCard = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const fileInputRef = useRef(null);

  const handleUploadAvatar = () => {
    fileInputRef.current.click(); // open file picker
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(uploadAvatar(file));
    }
  };

  return (
    <div className={css.card}>
      <div className={css.thumb}>
        <div className={css.avatarWrapper}>
          {user?.avatarUrl ? (
            <img className={css.img} src={user.avatarUrl} alt="My picture" />
          ) : (
            <img className={css.img} src={noAvatarImg} alt="No picture" />
          )}
        </div>
        <Button variant="primary" size="medium" className={css.addBtn} onClick={handleUploadAvatar}>
          <Icon name={'plus'} size={18} className={css.icon}></Icon>
        </Button>
        {/* hidden file input */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </div>
      <div className={css.userName}>
        <p>{user.name}</p>
      </div>
      <ul className={css.userInfoList}>
        <li className={css.userInfoItem}>
          <span>Email: </span>
          <span className={css.data}>{user.email}</span>
        </li>
        <li className={css.userInfoItem}>
          <span>Added recipes: </span>
          <span className={css.data}>{user.ownRecipesCount}</span>
        </li>
        <li className={css.userInfoItem}>
          <span>Favorites: </span>
          <span className={css.data}>{user.favoriteIds?.length}</span>
        </li>
        <li className={css.userInfoItem}>
          <span>Followers: </span>
          <span className={css.data}>{user.followersCount}</span>
        </li>
        <li className={css.userInfoItem}>
          <span>Following: </span>
          <span className={css.data}>{user.followingIds?.length}</span>
        </li>
      </ul>
    </div>
  );
};

export default UserInfoCard;