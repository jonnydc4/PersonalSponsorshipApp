import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Link, Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';


const NavBarMUI = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static" color="primary" sx={{ flexGrow: 1 }}>
            <Toolbar>
                <Link component={RouterLink} to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Button color="inherit">Home</Button>
                </Link>
                <Link component={RouterLink} to="/jobs" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Button color="inherit">Jobs</Button>
                </Link>
                <Link component={RouterLink} to="/account" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Button color="inherit">Account</Button>
                </Link>
                <div style={{ marginLeft: 'auto' }}>
                    <IconButton
                        size="large"
                        edge="end"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <Avatar alt="User Profile" src="/static/images/avatar/1.jpg" />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </Menu>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default NavBarMUI;

