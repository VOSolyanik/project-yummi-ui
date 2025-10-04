import React, { useState } from 'react';

import clsx from 'clsx';

import css from './Tabs.module.css';

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
        {activeTab === 'recipes' && <p>Content for recipes</p>}
        {activeTab === 'favorites' && <p>Content for favorites</p>}
        {activeTab === 'followers' && <p>Content for followers</p>}
        {activeTab === 'following' && <p>Content for following</p>}
      </div>
    </div>
  );
};

export default Tabs;
