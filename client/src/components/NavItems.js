import React from 'react';
import { Link } from 'react-router-dom';

function NavItems({items}) {
  return (
    <div className="container">
      {items.map( item => <Link to={item.urlPath}>{item.label}</Link>)}
    </div>
  )
}

export default NavItems;