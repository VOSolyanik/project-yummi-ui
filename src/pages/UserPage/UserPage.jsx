import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import clsx from 'clsx';

import css from './UserPage.module.css';

import MainTitle from '@components/MainTitle/MainTitle';
import Subtitle from '@components/Subtitle/Subtitle';

import { useAuthModal } from '@hooks/useAuthModal.js';

import Button from '@/components/Button/Button';
import Tabs from '@/components/Tabs/Tabs';
import UserInfoCard from '@/components/UserInfoCard/UserInfoCard';
import { getCurrentUser, selectAuthToken, selectUser, selectAuthLoading } from '@/redux/auth/authSlice';

const UserPage = () => {
  const dispatch = useDispatch();
  const { openLogoutModal } = useAuthModal();
  const token = useSelector(selectAuthToken);
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectAuthLoading);

  useEffect(() => {
    if (token && !user && !isLoading) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, token, user, isLoading]);

  const handleLogout = () => {
    openLogoutModal();
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
      <div className={css.sectionWrapper}>
        <div>
          <UserInfoCard />
          <Button className={css.btn} variant="primary" onClick={handleLogout}>
            LOG OUT
          </Button>
        </div>
        <Tabs />
      </div>
    </div>
  );
};

export default UserPage;