import React from 'react';
import { useAuth } from '../../contexts/authContext';
import { AppBar, Toolbar, Typography, Button, Avatar, Box, Drawer } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Person2Icon from '@mui/icons-material/Person2';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MessageIcon from '@mui/icons-material/Message';
import InventoryIcon from '@mui/icons-material/Inventory';

const Home = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    return (
        // Box is layed to the left side of the screen
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
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    Welcome, {currentUser.displayName || currentUser.email}
                </Typography>
                {/* Rest of page content goes here */}
            </Box>
        </Box>
    );
};

export default Home;
