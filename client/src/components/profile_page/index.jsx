import React, { useState } from 'react';
import { useAuth } from '../../contexts/authContext';
import { use } from 'bcrypt/promises';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Avatar, Box, Drawer, Grid } from '@mui/material';
import Person2Icon from '@mui/icons-material/Person2';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MessageIcon from '@mui/icons-material/Message';
import InventoryIcon from '@mui/icons-material/Inventory';

const ProfilePage = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    return (
        <Box sx={{ display: 'flex' }}>
        <Drawer
            variant="permanent"
            sx={{
                width: 240,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
            }}
        >
            <Box
            // Used to add padding to the drawer and stop content from touching header.
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    pt: 6,
                    // Use marginTop or paddingTop to ensure content is visible below AppBar
                    // Adjust the value according to your AppBar's height
                    mt: 8, 
                }}
            >
                <Button
                    startIcon={<SpaceDashboardIcon />}
                    onClick={() => navigate('/home')}
                    sx={{
                        pl: 3,
                        pb: 2,
                        display: 'flex',
                        flexDirection: 'row', // Explicitly set the flex direction
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        textAlign: 'left',
                        width: '100%' // Ensure the button takes the full width for alignment
                    }}
                >
                    Dashboard
                </Button>

                <Button startIcon={<LocalShippingIcon />} component={RouterLink} to="/job-manager/components" sx={{
                    pl: 3,
                    pb: 2,
                    display: 'flex',
                    flexDirection: 'row', // Explicitly set the flex direction
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    textAlign: 'left',
                    width: '100%' // Ensure the button takes the full width for alignment
                }}>
                    Post Job
                </Button>
                <Button startIcon={<InventoryIcon/>} component={RouterLink} to="/job-manager/components" sx={{
                    pl: 3,
                    pb: 2,
                    display: 'flex',
                    flexDirection: 'row', // Explicitly set the flex direction
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    textAlign: 'left',
                    width: '100%' // Ensure the button takes the full width for alignment
                }}>
                    Job Listings
                </Button>
                <Button startIcon={<MessageIcon />} component={RouterLink} to="/messages" sx={{
                    pl: 3,
                    pb: 2,
                    display: 'flex',
                    flexDirection: 'row', // Explicitly set the flex direction
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    textAlign: 'left',
                    width: '100%' // Ensure the button takes the full width for alignment
                }} >
                    Messages
                </Button>
                <Button startIcon={<Person2Icon />} color="primary" onClick={() => navigate('/profile_page')} sx={{
                    pl: 3,
                    pb: 2,
                    display: 'flex',
                    flexDirection: 'row', // Explicitly set the flex direction
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    textAlign: 'left',
                    width: '100%' // Ensure the button takes the full width for alignment
                }}>
                    Profile
                </Button>
            </Box>
        </Drawer>
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
