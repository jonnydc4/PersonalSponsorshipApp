import React, { useState } from 'react';
import { useAuth } from '../../contexts/authContext';
import { Box, Button, Typography, Avatar, Grid } from '@mui/material';
import { use } from 'bcrypt/promises';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

const ProfilePage = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    return (
        <Box sx={{ p: 2 }}>
            <AppBar position="fixed" color="default" sx={{ zIndex: 1201 }}>
                <Toolbar>
                    <Typography fontWeight="fontWeightMedium" variant="h5">
                        Influinity
                    </Typography>

                    <Box sx={{ flexGrow: 1 }} />
                    <Button onClick={() => navigate('/home')} sx={{ pl: 1 }}>
                        Home
                    </Button>
                    <Button sx={{ pl: 1 }} component={RouterLink} to="/job-manager/components">
                        Job Listings
                    </Button>
                    <Button sx={{ pl: 1 }} component={RouterLink} to="/messages"> {/* Corrected typo in "Messages" */}
                        Messages
                    </Button>
                    <Button color="primary" onClick={() => navigate('/profile_page')}>
                        <Avatar sx={{ width: 24, height: 24 }} src={currentUser.photoURL} />
                    </Button>
                </Toolbar>
            </AppBar>
            <Typography variant="h4" gutterBottom>
                User Profile
            </Typography>
            {/* todo: Create server request to fill user information */}
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ width: 56, height: 56, bgcolor: 'primary.main' }}>U</Avatar>
                    <Typography variant="h6">Username</Typography>
                    <Typography>Email: user@example.com</Typography>
                    {/* More detailed information can be added here */}
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Box sx={{ border: 1, p: 2, borderRadius: 2 }}>
                                {/* todo: Create server request to fill user information */}
                                <Typography variant="subtitle1">About Me:</Typography>
                                <Typography>Some interesting information about the user...</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Box sx={{ border: 1, p: 2, borderRadius: 2 }}>
                                {/* todo: Create server request to fill user information */}
                                <Typography variant="subtitle1">Contact Details:</Typography>
                                <Typography>Phone: (123) 456-7890</Typography>
                                <Typography>Email: user@example.com</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
        </Box>
    );
};

export default ProfilePage;
