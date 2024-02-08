import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const NavBarMUI = () => {
    return (
        <AppBar position="static" color="primary" sx={{ flexGrow: 1 }}>
            <Toolbar>
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Button color="inherit">Home</Button>
                </Link>
                <Link to="/jobs" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Button color="inherit">Jobs</Button>
                </Link>
                <Link to="/account" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Button color="inherit">Account</Button>
                </Link>
            </Toolbar>
        </AppBar>
    );
};

export default NavBarMUI;
