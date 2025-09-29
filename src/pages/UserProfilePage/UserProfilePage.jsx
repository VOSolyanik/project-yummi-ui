import React from 'react';

import css from './UserProfilePage.module.css';

import Button from '@/components/Button/Button';
import { UserInfoCard } from '@/components/UserInfoCard/UserInfoCard';


export const UserProfilePage = () => {
  return (
    <>
      <div>
        <UserInfoCard />
        <Button className={css.btn}>LOG OUT</Button>
      </div>
    </>
  );
};
