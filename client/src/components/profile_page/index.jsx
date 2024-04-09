import React, { useState } from 'react';
import { Box, Button, Typography, Avatar, Grid } from '@mui/material';
import { use } from 'bcrypt/promises';

const ProfilePage = () => {
    // State to manage the visibility of the profile details
    const [showProfile, setShowProfile] = useState(false);
    const navigate = useNavigate();

    // Toggle function
    const toggleProfile = () => setShowProfile(!showProfile);

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h4" gutterBottom>
                User Profile
            </Typography>
            <Button onClick={toggleProfile} variant="contained" sx={{ mb: 2 }}>
                {showProfile ? 'Hide Profile' : 'Show Profile'}
            </Button>
            {/* Conditional rendering based on showProfile state */}
            {showProfile && (
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ width: 56, height: 56, bgcolor: 'primary.main' }}>U</Avatar>
                    <Typography variant="h6">Username</Typography>
                    <Typography>Email: user@example.com</Typography>
                    {/* More detailed information can be added here */}
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
                                <Typography>Email: user@example.com</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            )}
        </Box>
    );
};

export default ProfilePage;
