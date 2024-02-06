import React from 'react';
import Logo from './Logo';
import NavItems from './NavItems';
import {FaBell} from 'react-icons/fa';
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

function NavBar({ onBellClick }) {
  const showBellIcon = localStorage.getItem('userId') !== null;

  return (
    <div className="nav-bar-container">
      <Logo />
      <NavItems items={navItems} />
      {showBellIcon && <FaBell onClick={onBellClick} style={{ cursor: 'pointer' }} />}
    </div>
  );
}

export default NavBar;
