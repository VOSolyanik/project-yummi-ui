import React, { useEffect, useState } from 'react';

import clsx from 'clsx';

import css from './Tabs.module.css';

import ListItems from '../ListItems/ListItems';

const Tabs = ({ user, isCurrent }) => {
  const [activeTab, setActiveTab] = useState('recipes');

  useEffect(() => {
    if (!isCurrent && (activeTab === 'favorites' || activeTab === 'following')) {
      setActiveTab('recipes');
    }
  }, [isCurrent, activeTab]);

  return (
    <div className={css.tabsContainer}>
      <div className={css.tabList}>
        <button
          className={clsx(css.tabBtn, {
            [css.active]: activeTab === 'recipes'
          })}
          onClick={() => setActiveTab('recipes')}
        >
          My recipes
        </button>
        {isCurrent && (
          <button
            className={clsx(css.tabBtn, {
              [css.active]: activeTab === 'favorites'
            })}
            onClick={() => setActiveTab('favorites')}
          >
            My favorites
          </button>
        )}
        <button
          className={clsx(css.tabBtn, {
            [css.active]: activeTab === 'followers'
          })}
          onClick={() => setActiveTab('followers')}
        >
          Followers
        </button>
        {isCurrent && (
          <button
            className={clsx(css.tabBtn, {
              [css.active]: activeTab === 'following'
            })}
            onClick={() => setActiveTab('following')}
          >
            Following
          </button>
        )}
      </div>

      {/* Tab Content */}
      <div className={css.tabContent}>
        {activeTab === 'recipes' && <ListItems user={user} type={'recipes'}/>}
        {activeTab === 'favorites' && <ListItems user={user} type={'favorites'}/>}
        {activeTab === 'followers' && <ListItems user={user} type={'followers'}/>}
        {activeTab === 'following' && <ListItems user={user} type={'following'}/>}
      </div>
    </div>
  );
};

export default Tabs;
