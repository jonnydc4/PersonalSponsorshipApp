import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../contexts/authContext'
import { doCreateUserWithEmailAndPassword } from '../../../firebase/auth'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const Register = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isRegistering, setIsRegistering] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const { userLoggedIn } = useAuth()

    const onSubmit = async (e) => {
        e.preventDefault()
        if(!isRegistering) {
            setIsRegistering(true)
            await doCreateUserWithEmailAndPassword(email, password).then(() => {
                navigate('/login')
            }).catch((err) => {
                console.log(err.error)
                console.log('Account creation failed')
                setIsRegistering(false)
            })
        }
    }

    return (
        <>
            <Box
                sx={{
                    width: '100vw',
                    height: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Box
                    sx={{
                        width: 384, // equivalent to w-96
                        p: 4,
                        boxShadow: 'xl',
                        border: 1,
                        borderRadius: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                    }}
                >
                    <Typography variant="h5" textAlign="center" fontWeight="bold" mb={6}>
                        Create a New Account
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={onSubmit}
                        sx={{ '& .MuiTextField-root': { mt: 2 }, display: 'flex', flexDirection: 'column', gap: 4 }}
                    >
                        <TextField
                            label="Email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            fullWidth
                        />
                        <TextField
                            disabled={isRegistering}
                            label="Password"
                            type="password"
                            autoComplete="new-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                        />
                        <TextField
                            disabled={isRegistering}
                            label="Confirm Password"
                            type="password"
                            autoComplete="off"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            fullWidth
                        />
                        {errorMessage && (
                            <Typography color="error" fontWeight="bold">
                                {errorMessage}
                            </Typography>
                        )}
                        <Button
                            type="submit"
                            disabled={isRegistering}
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 2 }}
                        >
                            {isRegistering ? 'Signing Up...' : 'Sign Up'}
                        </Button>
                        <Typography variant="body2" textAlign="center" mt={2}>
                            Already have an account?{' '}
                            <Link href="/login" underline="hover">
                                Continue
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default Register