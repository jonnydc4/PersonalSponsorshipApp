import React, { useState } from 'react'
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../../../firebase/auth'
import { useAuth } from '../../../contexts/authContext'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import {useNavigate} from "react-router-dom";

const Login = () => {
    const navigate = useNavigate()
    const { userLoggedIn } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSigningIn, setIsSigningIn] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault()
        if(!isSigningIn) {
            setIsSigningIn(true)
            await doSignInWithEmailAndPassword(email, password).then(() => {
                navigate('/home')
            }).catch(() => {
                console.log("Login failed")
                setIsSigningIn(false)
            })
            // doSendEmailVerification()
        }
    }

    const onGoogleSignIn = (e) => {
        e.preventDefault()
        if (!isSigningIn) {
            setIsSigningIn(true)
            doSignInWithGoogle().then(() => {
                navigate('/home')
            }).catch(err => {
                console.log(err)
                console.log("Google login failed")
                setIsSigningIn(false)
            })
        }
    }

    return (
        <div>
            <Box
                sx={{
                    width: '100%',
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Box
                    sx={{
                        width: 384, // equivalent to w-96
                        p: 4,
                        boxShadow: 'xl',
                        border: 1,
                        borderRadius: '16px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                    }}
                >
                    <Typography variant="h5" textAlign="center" fontWeight="bold">
                        Welcome Back
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={onSubmit}
                        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                    >
                        <TextField
                            label="Email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            variant="outlined"
                            fullWidth
                        />
                        <TextField
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            variant="outlined"
                            fullWidth
                        />
                        {errorMessage && (
                            <Typography color="error" fontWeight="bold">
                                {errorMessage}
                            </Typography>
                        )}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={isSigningIn}
                            fullWidth
                            sx={{ mt: 1 }}
                        >
                            {isSigningIn ? 'Signing In...' : 'Sign In'}
                        </Button>
                    </Box>
                    <Typography variant="body2" textAlign="center">
                        Don't have an account? <Link href="/register">Sign up</Link>
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mt: 2,
                        }}
                    >
                        <Box sx={{ flexGrow: 1, height: 1, bgcolor: 'divider' }} />
                        <Box sx={{ mx: 2, fontWeight: 'bold' }}>OR</Box>
                        <Box sx={{ flexGrow: 1, height: 1, bgcolor: 'divider' }} />
                    </Box>
                    <Button
                        onClick={(e) => onGoogleSignIn(e)}
                        disabled={isSigningIn}
                        variant="outlined"
                        fullWidth
                        sx={{ mt: 1, py: 1.25, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1 }}
                        startIcon={
                            <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                {/* Google SVG icon */}
                            </svg>
                        }
                    >
                        {isSigningIn ? 'Signing In...' : 'Continue with Google'}
                    </Button>
                </Box>
            </Box>
        </div>
    )
}

export default Login