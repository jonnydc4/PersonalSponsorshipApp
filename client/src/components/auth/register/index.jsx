import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {useAuth} from '../../../contexts/authContext'
import {doCreateUserWithEmailAndPassword} from '../../../firebase/auth'
import {
    TextField,
    Stack,
    Typography,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Checkbox,
    FormControlLabel,
    Link
} from "@mui/material";
import TermsAndServices from "./termsAndServices";

const Register = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [isRegistering, setIsRegistering] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [termsOpen, setTermsOpen] = useState(false);

    const {userLoggedIn} = useAuth()


    const handleOpenTerms = () => {
        setTermsOpen(true);
    };

    const handleCloseTerms = () => {
        setTermsOpen(false);
    };

    const onSubmit = async (e) => {
        e.preventDefault()
        // Check for password length
        if (password.length < 6) {
            setErrorMessage("Password must be at least 6 characters long.")
            return; // Stop the form submission if the password is too short
        }
        if (confirmPassword.length < 6) {
            setErrorMessage("Password must be at least 6 characters long.")
            return; // Stop the form submission if the password is too short
        }
        if (confirmPassword !== password) {
            setErrorMessage("Passwords must match.")
            return; // Stop the form submission if the password is too short
        }
        if (!isRegistering) {
            setIsRegistering(true)
            await doCreateUserWithEmailAndPassword(email, password)
                .then(() => {
                    navigate('/login')
                })
                .catch((err) => {
                    console.log(err.error)
                    console.log('Account creation failed')
                    setIsRegistering(false)
                    setErrorMessage(err.error) // Update to use the actual error message from your auth system
                })
        }
    }

    return (
        // <>
        //     {userLoggedIn ? (
        //         <Stack
        //             spacing={2}
        //             sx={{
        //                 justifyContent: 'center',
        //                 alignItems: 'center',
        //             }}
        //         >
        //             <Typography
        //                 variant="h3"
        //                 fontWeight="fontWeightBold"
        //             >
        //                 You are already logged in.
        //             </Typography>
        //             <Typography variant="h6" fontWeight="fontWeightLight">
        //                 Navigate to the home screen. ->
        //                 <Link onClick={() => navigate("/home")} underline="hover">
        //                     home
        //                 </Link>
        //             </Typography>
        //         </Stack>
        //     ) : (
        //         <Box
        //             sx={{
        //                 width: '100vw',
        //                 height: '100vh',
        //                 display: 'flex',
        //                 alignItems: 'center',
        //                 justifyContent: 'center',
        //             }}
        //         >
        //             <Box
        //                 sx={{
        //                     width: 384, // equivalent to w-96
        //                     p: 4,
        //                     boxShadow: 'xl',
        //                     border: 1,
        //                     borderRadius: 2,
        //                     display: 'flex',
        //                     flexDirection: 'column',
        //                     gap: 2,
        //                 }}
        //             >
        //                 <Typography variant="h5" textAlign="center" fontWeight="bold" mb={6}>
        //                     Create a New Account
        //                 </Typography>
        //                 <Box
        //                     component="form"
        //                     onSubmit={onSubmit}
        //                     sx={{ '& .MuiTextField-root': { mt: 2 }, display: 'flex', flexDirection: 'column', gap: 4 }}
        //                 >
        //                     {/* Fields for email, password, etc., remain unchanged */}
        //                     <FormControlLabel
        //                         control={<Checkbox required />}
        //                         label={<Link onClick={handleOpenTerms} underline="hover">I accept the Terms and Services.</Link>}
        //                         sx={{ mt: 2 }}
        //                     />
        //                     {errorMessage && (
        //                         <Typography color="error" fontWeight="bold">
        //                             {errorMessage}
        //                         </Typography>
        //                     )}
        //                     <Button
        //                         type="submit"
        //                         disabled={isRegistering}
        //                         variant="contained"
        //                         color="primary"
        //                         fullWidth
        //                         sx={{ mt: 2 }}
        //                     >
        //                         {isRegistering ? 'Signing Up...' : 'Sign Up'}
        //                     </Button>
        //                     <Typography variant="body2" textAlign="center" mt={2}>
        //                         Already have an account?{' '}
        //                         <Link onClick={() => navigate("/login")} underline="hover">
        //                             Login
        //                         </Link>
        //                     </Typography>
        //                 </Box>
        //             </Box>
        //         </Box>
        //     )}
        // </>
        <>
            {userLoggedIn ? (
                <Stack
                    spacing={2}
                    sx={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Typography
                        variant="h3"
                        fontWeight="fontWeightBold"
                    >
                        You are already logged in.
                    </Typography>
                    <Typography variant="h6" fontWeight="fontWeightLight">
                        Navigate to the home screen. ->
                        <Link
                            onClick={() => {
                                navigate("/home")
                            }}
                            underline="hover"
                        >
                            home
                        </Link>
                    </Typography>
                </Stack>
            ) : (
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
                            sx={{'& .MuiTextField-root': {mt: 2}, display: 'flex', flexDirection: 'column', gap: 4}}
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
                                error={password.length > 0 && password.length < 6}
                                helperText={password.length > 0 && password.length < 6 ? "Password must be at least 6 characters long." : ""}
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
                                error={confirmPassword.length > 0 && confirmPassword.length < 6}
                                helperText={confirmPassword.length > 0 && confirmPassword.length < 6 ? "Password must be at least 6 characters long." : ""}
                                fullWidth
                            />
                            <FormControlLabel
                                control={<Checkbox required/>}
                                label={<Link onClick={handleOpenTerms} underline="hover">I accept the Terms and
                                    Services.</Link>}
                                sx={{mt: 2}}
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
                                sx={{mt: 2}}
                            >
                                {isRegistering ? 'Signing Up...' : 'Sign Up'}
                            </Button>
                            <Typography variant="body2" textAlign="center" mt={2}>
                                Already have an account?{' '}
                                <Link
                                    onClick={() => {
                                        navigate("/login")
                                    }}
                                    underline="hover"
                                >
                                    Login
                                </Link>
                            </Typography>
                        </Box>
                    </Box>
                    {/* Terms and Services Dialog */}
                    <Dialog
                        open={termsOpen}
                        onClose={handleCloseTerms}
                        aria-labelledby="terms-dialog-title"
                    >
                        <DialogTitle id="terms-dialog-title">Terms and Services</DialogTitle>
                        <DialogContent>
                            <TermsAndServices />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseTerms} color="primary">Close</Button>
                        </DialogActions>
                    </Dialog>
                </Box>
            )}
        </>

    )
}

export default Register
