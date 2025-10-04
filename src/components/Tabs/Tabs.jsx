import React, { useState } from 'react';

import clsx from 'clsx';

import css from './Tabs.module.css';

import ListItems from '../ListItems/ListItems';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState('recipes');

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
        <button
          className={clsx(css.tabBtn, {
            [css.active]: activeTab === 'favorites'
          })}
          onClick={() => setActiveTab('favorites')}
        >
          My favorites
        </button>
        <button
          className={clsx(css.tabBtn, {
            [css.active]: activeTab === 'followers'
          })}
          onClick={() => setActiveTab('followers')}
        >
          Followers
        </button>
        <button
          className={clsx(css.tabBtn, {
            [css.active]: activeTab === 'following'
          })}
          onClick={() => setActiveTab('following')}
        >
          Following
        </button>
      </div>

      {/* Tab Content */}
      <div className={css.tabContent}>
        {activeTab === 'recipes' && <ListItems type={'recipes'}/>}
        {activeTab === 'favorites' && <ListItems type={'favorites'}/>}
        {activeTab === 'followers' && <ListItems type={'followers'}/>}
        {activeTab === 'following' && <ListItems type={'following'}/>}
      </div>
    </div>
  );
};

export default Tabs;