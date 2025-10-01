import React, { useState } from 'react';

import clsx from 'clsx';

import css from './Tabs.module.css';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState('tab1');

  return (
    <div className={css.tabsContainer}>
      {/* Tab List */}
      <div className={css.tabList}>
        <button
          className={clsx(css.tabBtn, {
            [css.active]: activeTab === 'tab1',
          })}
          onClick={() => setActiveTab('tab1')}
        >
          My recipes
        </button>
        <button
          className={clsx(css.tabBtn, {
            [css.active]: activeTab === 'tab2',
          })}
          onClick={() => setActiveTab('tab2')}
        >
          My favorites
        </button>
        <button
          className={clsx(css.tabBtn, {
            [css.active]: activeTab === 'tab3',
          })}
          onClick={() => setActiveTab('tab3')}
        >
          Followers
        </button>
        <button
          className={clsx(css.tabBtn, {
            [css.active]: activeTab === 'tab4',
          })}
          onClick={() => setActiveTab('tab4')}
        >
          Following
        </button>
      </div>

      {/* Tab Content */}
      <div className={css.tabContent}>
        {activeTab === 'tab1' && <p>Content for Tab 1</p>}
        {activeTab === 'tab2' && <p>Content for Tab 2</p>}
        {activeTab === 'tab3' && <p>Content for Tab 3</p>}
        {activeTab === 'tab4' && <p>Content for Tab 4</p>}
      </div>
    </div>
  );
};

export default Tabs;