import React, {useState} from "react";
import {Box, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {doPasswordReset} from "../../../firebase/auth";

const ForgotPassword = () => {
    const [openResetDialog, setOpenResetDialog] = useState(false);
    const [resetEmail, setResetEmail] = useState('');

    const handleSendResetEmail = (e) => {
        e.preventDefault();
        if (resetEmail) { // Check if the email field is not empty
            doPasswordReset(resetEmail).then(() => {
                alert("Password reset link sent to your email");
                setOpenResetDialog(false);
            }).catch((err) => {
                console.error(err.code);
                alert(`Failed to send password reset email\nError: ${err.code}`);
                setOpenResetDialog(false);
            });
        } else {
            alert("Please enter your email address in the email field");
        }
    };

    const handleResetEmailChange = (event) => {
        setResetEmail(event.target.value);
    };

    const handleForgotPasswordClick = () => {
        setOpenResetDialog(true);
    };

    const handleClose = () => {
        setOpenResetDialog(false);
    };

    return (
        <Box>
            <Typography variant="body2" textAlign="right" sx={{cursor: 'pointer'}} onClick={handleForgotPasswordClick}>
                Forgot Password?
            </Typography>
            <Dialog open={openResetDialog} onClose={handleClose}>
                <DialogTitle>Reset Password</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                        value={resetEmail}
                        onChange={handleResetEmailChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSendResetEmail}>Send Reset Email</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}

export default ForgotPassword