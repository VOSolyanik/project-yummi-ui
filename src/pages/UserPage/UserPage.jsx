import React, { useEffect, useMemo } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import clsx from 'clsx';

import css from './UserPage.module.css';

import { selectUser, selectActionInProgress, followUser, unfollowUser } from '@redux/auth/authSlice';
import { fetchUserById, selectSelectedUser, selectIsLoadingSelectedUser } from '@redux/users/usersSlice';

import Button from '@components/Button/Button';
import Loader from '@components/Loader/Loader';
import MainTitle from '@components/MainTitle/MainTitle';
import Subtitle from '@components/Subtitle/Subtitle';
import Tabs from '@components/Tabs/Tabs';
import UserInfoCard from '@components/UserInfoCard/UserInfoCard';

import { useAuthModal } from '@hooks/useAuthModal.js';

const UserPage = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const { openLogoutModal } = useAuthModal();
  const currentUser = useSelector(selectUser);
  const selectedUser = useSelector(selectSelectedUser);
  const isLoading = useSelector(selectIsLoadingSelectedUser);
  const isActionInProgress = useSelector(selectActionInProgress);

  const profileId = useMemo(
    () => userId === 'me' ? currentUser?.id : userId,
    [userId, currentUser?.id]
  );

  const isCurrentUserProfile = useMemo(
    () => profileId === currentUser?.id,
    [profileId, currentUser?.id]
  );

  const isFollowed = useMemo(
    () => !isCurrentUserProfile && currentUser?.followingIds?.some(id => id === selectedUser?.id),
    [currentUser, selectedUser, isCurrentUserProfile]
  );

  useEffect(() => {
    dispatch(fetchUserById(profileId));
  }, [dispatch, profileId]);


  const handleLogout = () => {
    openLogoutModal();
  };

  const handleFollow = () => {
    if (isActionInProgress || isCurrentUserProfile) return;

    if (isFollowed) {
      dispatch(unfollowUser(selectedUser.id));
    } else {
      dispatch(followUser(selectedUser.id));
    }
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
      {isLoading || !selectedUser ? (<Loader />) : (
        <div className={css.sectionWrapper}>
          <div>
            <UserInfoCard user={selectedUser} isCurrent={isCurrentUserProfile}/>
            {isCurrentUserProfile ? (
              <Button className={css.btn} variant="primary" onClick={handleLogout}>
                LOG OUT
              </Button>
            ) : (
              <Button className={css.btn} variant="primary" onClick={handleFollow}>
                {
                  isFollowed
                    ? 'UNFOLLOW'
                    : 'FOLLOW'
                }
              </Button>
            )}
          </div>
          <Tabs user={selectedUser} isCurrent={isCurrentUserProfile}/>
        </div>
      )}
    </div>
  );
};

export default UserPage;