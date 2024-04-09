import React from 'react';
import { useAuth } from '../../contexts/authContext';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2


const Home = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    return (
        <Box>
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

            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid xs={6}>
                    <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                        Welcome, {currentUser.displayName || currentUser.email}
                    </Typography>
                </Grid>
                <Grid xs={6}>
                    2
                </Grid>
                <Grid xs={6}>
                    3
                </Grid>
                <Grid xs={6} borderColor={"primary"}>
                    4
                </Grid>
            </Grid>

        </Box>
    );
};

export default Home;
