import React from 'react';
import { useAuth } from '../../contexts/authContext';
import { Typography, Avatar, Box, Grid } from '@mui/material';

const ProfilePage = () => {
    const { currentUser } = useAuth();

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, p: 3 }}>
            <Typography variant="h4" gutterBottom>
                User Profile
            </Typography>
            <Avatar sx={{ width: 56, height: 56, bgcolor: 'primary.main' }}>U</Avatar>
            <Typography variant="h6">{currentUser.displayName || 'Username'}</Typography>
            <Typography>Email: {currentUser.email || 'user@example.com'}</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Box sx={{ border: 1, p: 2, borderRadius: 2 }}>
                        <Typography variant="subtitle1">About Me:</Typography>
                        <Typography>Some interesting information about the user...</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box sx={{ border: 1, p: 2, borderRadius: 2 }}>
                        <Typography variant="subtitle1">Contact Details:</Typography>
                        <Typography>Phone: (123) 456-7890</Typography>
                        <Typography>Email: {currentUser.email || 'user@example.com'}</Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ProfilePage;
