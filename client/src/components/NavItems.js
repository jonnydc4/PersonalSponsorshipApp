import React from 'react';
import { Link } from 'react-router-dom';
import "./NavItems.css";

function NavItems({items}) {
  return (
    <div className="nav-items-container">
      {items.map( item => <Link className="nav-link" key={items.urlPath} to={item.urlPath}>{item.label}</Link>)}
    </div>
  )
}

export default NavItems;