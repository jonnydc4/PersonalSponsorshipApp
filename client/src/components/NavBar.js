import React from 'react';
import Logo from './Logo';
import NavItems from './NavItems';
import './NavBar.css';

const navItems = [
  {
    label: "Home",
    urlPath: '/home',
  },{
    label: "Jobs",
    urlPath: '/jobs',
  },{
    label: "Account",
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