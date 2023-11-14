import React from 'react';
import Logo from './Logo';
import NavItems from './NavItems';
import './NavBar.css';

const navItems = [
  {
    urlPath: '/home',
    urlPath: '/jobs',
    urlPath: '/account'
  }
]

function NavBar() {
  return (<div className="nav-bar-container">
      <Logo />
      <NavItems items={navItems} />
    </div>)
}

export default NavBar;