import React from 'react';
import { useAuth } from '../../contexts/authContext';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';

import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2


const Home = () => {
    const { currentUser } = useAuth();

    return (
        <Box>
            <AppBar position="fixed" color="default" sx={{ zIndex: 1201 }}>
                <Toolbar>
                    <Typography fontWeight="fontWeightMedium" variant="h5">
                        Influinity
                    </Typography>

                    <Box sx={{ flexGrow: 1 }} />
                    <Button fontWeight="fontWeightMedium" variant="h6" sx={{ pl: 1 }} component={RouterLink} to="/home">
                        Home
                    </Button>
                    <Button fontWeight="fontWeightMedium" variant="h6" sx={{ pl: 1 }} component={RouterLink} to="/job-manager">
                        Job Listings
                    </Button>
                    <Button fontWeight="fontWeightMedium" variant="h6" sx={{ pl: 1 }} component={RouterLink} to="/home">
                        Messanges
                    </Button>
                    <Button color="primary" component={RouterLink} to="/profile">
                        <Avatar sx={{ width: 24, height: 24 }} src={currentUser.photoURL} />
                    </Button>

                </Toolbar>

            </AppBar>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid xs={6}>
                    <Item>
                        <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                            Welcome, {currentUser.displayName || currentUser.email}
                        </Typography>
                    </Item>
                </Grid>
                <Grid xs={6}>
                    <Item>2</Item>
                </Grid>
                <Grid xs={6}>
                    <Item>3</Item>
                </Grid>
                <Grid xs={6}>
                    <Item>4</Item>
                </Grid>
            </Grid>

        </Box>
    );
};

export default Home;
