import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import { socialAPI } from '@services/socialApi.js';
import clsx from 'clsx';

import css from './Tabs.module.css';

import { selectUser } from '@redux/auth/authSlice.js';

import FollowerItem from '@components/FollowerItem/FollowerItem.jsx';

import noAvatarImg from '@assets/images/no-avatar.webp';


const Tabs = ({ currentUser }) => {
  const [activeTab, setActiveTab] = useState('recipes');

  // ----- responsive -----
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767.98px)');
    const onChange = e => setIsMobile(e.matches);
    mq.addEventListener?.('change', onChange);
    setIsMobile(mq.matches);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);

  // ----- auth user -----
  const userFromStore = useSelector(selectUser);

  // ----- following state -----
  const [following, setFollowing] = useState([]);
  const [loadingFollowing, setLoadingFollowing] = useState(false);
  const [followingError, setFollowingError] = useState(null);

  // ----- followers state -----
  const [followers, setFollowers] = useState([]);
  const [loadingFollowers, setLoadingFollowers] = useState(false);
  const [followersError, setFollowersError] = useState(null);

  // Тягнемо підписки (following) лише коли відкрита вкладка "following"
  useEffect(() => {
    const userId = currentUser?.id ?? userFromStore?.id;
    if (activeTab !== 'following' || !userId) return;

    let cancelled = false;

    (async () => {
      try {
        setLoadingFollowing(true);
        setFollowingError(null);

        // якщо API повертає { data: { items, totalCount } }
        const res = await socialAPI.getFollowing(userId, 1, 5);
        const items = res?.data?.items ?? res?.items ?? [];

        if (!cancelled) setFollowing(items);
      } catch (e) {
        if (!cancelled) setFollowingError(e?.message ?? 'Помилка завантаження');
      } finally {
        if (!cancelled) setLoadingFollowing(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [activeTab, currentUser?.id, userFromStore?.id]);

  // Тягнемо підписників (followers) лише коли відкрита вкладка "followers"
  useEffect(() => {
    const userId = currentUser?.id ?? userFromStore?.id;
    if (activeTab !== 'followers' || !userId) return;

    let cancelled = false;

    (async () => {
      try {
        setLoadingFollowers(true);
        setFollowersError(null);

        const res = await socialAPI.getFollowers(userId, 1, 5);
        const items = res?.data?.items ?? res?.items ?? [];

        if (!cancelled) setFollowers(items);
      } catch (e) {
        if (!cancelled) setFollowersError(e?.message ?? 'Помилка завантаження');
      } finally {
        if (!cancelled) setLoadingFollowers(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [activeTab, currentUser?.id, userFromStore?.id]);

  return (
    <div className={css.tabsContainer}>
      <div className={css.tabList}>
        <button
          className={clsx(css.tabBtn, { [css.active]: activeTab === 'recipes' })}
          onClick={() => setActiveTab('recipes')}
        >
          My recipes
        </button>
        <button
          className={clsx(css.tabBtn, { [css.active]: activeTab === 'favorites' })}
          onClick={() => setActiveTab('favorites')}
        >
          My favorites
        </button>
        <button
          className={clsx(css.tabBtn, { [css.active]: activeTab === 'followers' })}
          onClick={() => setActiveTab('followers')}
        >
          Followers
        </button>
        <button
          className={clsx(css.tabBtn, { [css.active]: activeTab === 'following' })}
          onClick={() => setActiveTab('following')}
        >
          Following
        </button>
      </div>

      <div className={css.tabContent}>
        {activeTab === 'recipes' && <p>Content for recipes</p>}
        {activeTab === 'favorites' && <p>Content for favorites</p>}
        {activeTab === 'followers' && (
          <>
            {loadingFollowers && <p>Завантаження…</p>}
            {followersError && <p role="alert">Помилка: {followersError}</p>}
            {!loadingFollowers && !followersError && followers.length === 0 && <p>Немає підписників.</p>}
            {!loadingFollowers && !followersError && followers.length > 0 && (
              <ul className={css.followersList}>
                {followers.map(f => (
                  <FollowerItem
                    key={f.id}
                    id={f.id}
                    username={f.name}
                    avatar={f.avatar ?? noAvatarImg}
                    isFollowing={false}
                    recipesCount={isMobile ? 0 : 3}
                  />
                ))}
              </ul>
            )}
          </>
        )}

        {activeTab === 'following' && (
          <>
            {loadingFollowing && <p>Завантаження…</p>}
            {followingError && <p role="alert">Помилка: {followingError}</p>}
            {!loadingFollowing && !followingError && following.length === 0 && <p>Немає підписок.</p>}
            {!loadingFollowing && !followingError && following.length > 0 && (
              <ul className={css.followersList}>
                {following.map(f => (
                  <FollowerItem
                    key={f.id}
                    id={f.id}
                    username={f.name}
                    avatar={f.avatar ?? noAvatarImg}
                    isFollowing={true}
                    recipesCount={isMobile ? 0 : 3}
                  />
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Tabs;