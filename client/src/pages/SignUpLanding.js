// <--------------- SignUpLanding.js - Screen that serves to direct influencers and companies to correct sign-up screen --------------->
// This file serves as the landing page for the application. It is the first page (after clicking signup) that the user will see when they visit the site. 
// It contains two buttons, one for influencers and one for companies. When the user clicks on one of the buttons, 
// they will be directed to the sign-up page for that user type.

import React from 'react';
import { Button, Grid, ThemeProvider } from '@mui/material';
import { Link } from 'react-router-dom';

const LandingPage = ({ theme }) => {
    return (
        <ThemeProvider theme={theme}>
            <Grid container spacing={2} justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
                <Grid item>
                    <Button variant="contained" color="primary" component={Link} to="/signup-influencer">
                        Influencer
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="secondary" component={Link} to="/signup-company">
                        Company
                    </Button>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
};

export default LandingPage;
