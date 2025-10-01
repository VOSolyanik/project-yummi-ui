import React from 'react';

import clsx from 'clsx';

import css from './UserProfilePage.module.css';

import MainTitle from '@components/MainTitle/MainTitle';
import Subtitle from '@components/Subtitle/Subtitle';

import Button from '@/components/Button/Button';
import Tabs from '@/components/Tabs/Tabs';
import UserInfoCard  from '@/components/UserInfoCard/UserInfoCard';

const UserProfilePage = () => {
  return (
    <div className={clsx('container', css.container)}>
      <div className={css.breadcrumb}>
        Home / <span>Profile</span>
      </div>
      <MainTitle level={2} id="profile-heading" className={css.title}>
        Profile
      </MainTitle>

      <Subtitle className={css.subtitle}>
        Reveal your culinary art, 
        share your favorite recipe and create gastronomic masterpieces with us.
      </Subtitle>
      <div className={css.sectionWrapper}>
        <div>
          <UserInfoCard />
          <Button className={css.btn} variant="primary">LOG OUT</Button>
        </div>
        <Tabs />
      </div>
    </div>
  );
};

export default UserProfilePage;