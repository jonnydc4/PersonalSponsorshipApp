import React, {useState} from 'react'
import {doSignInWithEmailAndPassword, doSignInWithGoogle} from '../../../firebase/auth'
import {useAuth} from '../../../contexts/authContext'
import {Box, Typography, TextField, Button, Link} from '@mui/material';
import ForgotPassword from "../forgot_password/index";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const navigate = useNavigate()
    const {userLoggedIn} = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSigningIn, setIsSigningIn] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault()
        if (!isSigningIn) {
            setIsSigningIn(true)
            await doSignInWithEmailAndPassword(email, password).then(() => {
                navigate('/home')
            }).catch((err) => {
                alert(`Login failed\nError: ${err.code}`)
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
                console.log(err.code)
                alert(`Google login failed\nError: ${err.code}`)
                setIsSigningIn(false)
            })
        }
    }

    return (
        <>
            {userLoggedIn ? (
                <Box
                    sx={{
                        width: '100%',
                        height: '100vh',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Box>
                        <Typography
                            variant="h3"
                            fontWeight="fontWeightBold"
                        >
                            You are already logged in.
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="h6" fontWeight="fontWeightLight">
                            Go to your
                            <Link
                                onChange={() => {
                                    navigate("/home")
                                }}
                                underline="hover"
                            >
                                Profile
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            ) : (
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
                                sx={{display: 'flex', flexDirection: 'column', gap: 2}}
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
                                <ForgotPassword/>

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
                                    sx={{mt: 1}}
                                >
                                    {isSigningIn ? 'Signing In...' : 'Sign In'}
                                </Button>
                            </Box>
                            <Typography variant="body2" textAlign="center">
                                Don't have an account?
                                <Link
                                    onClick={() => {
                                        navigate("/register")
                                    }}
                                >
                                    Sign up
                                </Link>
                            </Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    mt: 2,
                                }}
                            >
                                <Box sx={{flexGrow: 1, height: 1, bgcolor: 'divider'}}/>
                                <Box sx={{mx: 2, fontWeight: 'bold'}}>OR</Box>
                                <Box sx={{flexGrow: 1, height: 1, bgcolor: 'divider'}}/>
                            </Box>
                            <Button
                                onClick={(e) => onGoogleSignIn(e)}
                                disabled={isSigningIn}
                                variant="outlined"
                                fullWidth
                                sx={{
                                    mt: 1,
                                    py: 1.25,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    gap: 1
                                }}
                            >
                                {isSigningIn ? 'Signing In...' : 'Continue with Google'}
                            </Button>
                        </Box>
                    </Box>
                </div>
            )}
        </>


    )
}

export default Login