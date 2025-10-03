import React from 'react';

const ListItems = ({ items, type }) => {

  {items.map((item) => {
    if (type === 'recipe') return <div key={item.name}>Recipe</div>;
    if (type === 'user') return <div key={item.name}>User</div>;
  });}
};

export default ListItems;