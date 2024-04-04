import React from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext'
import { doSignOut } from '../../firebase/auth'
import {Box} from "@mui/material";

const Header = () => {
    const navigate = useNavigate()
    const { userLoggedIn } = useAuth()
    return (
        <AppBar position="fixed" color="default" sx={{ zIndex: 1201 }}>
            <Toolbar>
                <Typography fontWeight="fontWeightMedium" variant="h5">
                    Influinity
                </Typography>
                <Box sx={{flexGrow: 1}}/>  {/*Spacer Element*/}
                {userLoggedIn ? (
                    <Button
                        color="primary"
                        onClick={() => {
                            doSignOut().then(() => {
                                navigate('/login');
                            });
                        }}
                    >
                        Logout
                    </Button>
                ) : (
                    <>
                        <Button color="primary" component={RouterLink} to="/login">
                            Login
                        </Button>
                        <Button color="primary" component={RouterLink} to="/register">
                            Register New Account
                        </Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Header