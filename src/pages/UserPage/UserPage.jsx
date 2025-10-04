import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import clsx from 'clsx';

import css from './UserPage.module.css';

import MainTitle from '@components/MainTitle/MainTitle';
import Subtitle from '@components/Subtitle/Subtitle';

import { useAuthModal } from '@hooks/useAuthModal.js';

import Button from '@/components/Button/Button';
import Tabs from '@/components/Tabs/Tabs';
import UserInfoCard from '@/components/UserInfoCard/UserInfoCard';
import { getCurrentUser, selectAuthToken, selectUser, selectAuthLoading } from '@/redux/auth/authSlice';
import { fetchUserById, unfollowUser, followUser, selectSelectedUser } from '@/redux/users/usersSlice';

const UserPage = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const { openLogoutModal } = useAuthModal();
  const token = useSelector(selectAuthToken);
  const currentUser = useSelector(selectUser);
  const selectedUser = useSelector(selectSelectedUser);
  const isLoading = useSelector(selectAuthLoading);

  useEffect(() => {
    if (userId && userId !== 'me' && !selectedUser && !isLoading) { 
      dispatch(fetchUserById(userId));
    } 
    else if (token && !currentUser && !isLoading) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, token, currentUser, isLoading, userId, selectedUser]);

  const handleLogout = () => {
    openLogoutModal();
  };

  // TODO: зробити логіку кнопки Follow.
  // Зробила thunks (follow/unfollow) у usersSlice.js
  // але потрібно ще доповнити slice для них, щось не змогла придумати як правильно.
  // У компоненті FollowerItem є також логіка follow/unfollow, але там не через store,
  // тож потрібно буде і там переробити.

  const handleFollow = () => {
    // if (!selectedUser) return;

    // if (selectedUser.isFollowed) {
    //   dispatch(unfollowUser(selectedUser.id));
    // } else {
    //   dispatch(unfollowUser(selectedUser.id));
    // }
  };

  return (
    <div className={clsx('container', css.container)}>
      <div className={css.titlesContainer}>
        <div className={css.breadcrumb}>
          Home / <span>Profile</span>
        </div>
        <MainTitle level={2} id="profile-heading" className={css.title}>
          Profile
        </MainTitle>

        <Subtitle className={css.subtitle}>
          Reveal your culinary art, share your favorite recipe and create gastronomic masterpieces with us.
        </Subtitle>
      </div>
      {userId && userId !== 'me' ? (
        <div className={css.sectionWrapper}>
          <div>
            <UserInfoCard user={selectedUser} isCurrent={false}/>
            <Button className={css.btn} variant="primary" onClick={handleFollow}>
              {
                selectedUser?.isFollowed
                  ? 'UNFOLLOW'
                  : 'FOLLOW'
              }
            </Button>
          </div>
          <Tabs isCurrent={false}/>
        </div>
      ) : (
        <div className={css.sectionWrapper}>
          <div>
            <UserInfoCard user={currentUser} isCurrent={true}/>
            <Button className={css.btn} variant="primary" onClick={handleLogout}>
              LOG OUT
            </Button>
          </div>
          <Tabs isCurrent={true}/>
        </div>
      )}
    </div>
  );
};

export default UserPage;