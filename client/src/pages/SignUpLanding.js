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
