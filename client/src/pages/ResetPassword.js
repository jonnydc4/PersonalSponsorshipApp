// <--------------- ResetPassword.js - Used in reseting password of user, in the event they forget --------------->
// Page contains a form that allows the user to input their new password and confirm it.
// When the user submits the form, the data is sent to the server and the user's password is reset (if the passwords match).

import React, {useState} from 'react';
import {
    Avatar,
    Box,
    Button,
    CssBaseline,
    Grid,
    Paper,
    TextField,
    Typography,
    Link,
    ThemeProvider
} from '@mui/material';
import LockResetIcon from '@mui/icons-material/LockReset';
import {Link as RouterLink} from 'react-router-dom';

export default function ResetPassword({theme}) {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Validate passwords: make sure they match and meet your criteria
        // Handle the password reset logic here
        console.log('Reset password for:', password);
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{height: '100vh'}}>
                <CssBaseline/>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                            <LockResetIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Reset your password
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 1}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="New Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                error={!!passwordError}
                                helperText={passwordError}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="confirmPassword"
                                label="Confirm New Password"
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                error={!!confirmPasswordError}
                                helperText={confirmPasswordError}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                Reset Password
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link component={RouterLink} to={"/login"} variant="body2">
                                        Back to Sign In
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
