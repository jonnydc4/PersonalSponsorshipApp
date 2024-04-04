// <--------------- SignUpCompany.js - Signup page used to creating an company account --------------->
// This file serves as the sign-up page for companies. It contains a form that allows the user to input their email, password, and name.
// When the user submits the form, the data is sent to the server and the user is registered.

import * as React from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Paper, Box, Grid, Typography, ThemeProvider } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {useState} from "react";

export default function SignUpCompany({theme}) {
    const navigate = useNavigate();
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [nameError, setNameError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get('email');
        const password = formData.get('password');
        const name = formData.get('companyName');
        const address = formData.get('address');
        const accountType = 'company'

        setEmailError('');
        setPasswordError('');
        setNameError('');

        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, name, address, accountType }),
        });

        const data = await response.json();

        if (!response.ok) {
            // THE ERROR IS IN HERE
            // ERROR CODE 500, AN ERROR HAS OCCURED DURING THE LOGIN PROCESS
            // Set the error message from the server to state
            if (data.emailError) setEmailError(data.emailError);
            if (data.passwordError) setPasswordError(data.passwordError);
        } else {
            // Handle successful registration
            console.log('Registration successful!');
            navigate('/login');
        }
        // } catch (error) {
        //     // Handle fetch errors
        //     console.error('Fetch error: ', error);
        // }
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
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
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Company Sign Up
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="companyName"
                                label="Company Name"
                                name="companyName"
                                autoComplete="companyName"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="address"
                                label="address"
                                name="address"
                                autoComplete="address"
                                autoFocus
                            />
                            <FormControlLabel
                                control={<Checkbox value="agree" color="primary" />}
                                label="I agree to the terms and conditions"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign Up
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link component={RouterLink} to={"/login"} variant="body2">
                                        Already have an account? Sign in
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
