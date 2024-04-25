import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

function NewChatRoomDialog({open, setOpen, currentUserId}) {
    // State to handle the open/close of the dialog
    // const [open, setOpen] = useState(false);
    // State to store the username input
    const [username, setUsername] = useState('');
    const userType = localStorage.getItem('userType')
    const usernameSelf = localStorage.getItem('userName')

    // Function to handle dialog opening
    const handleClickOpen = () => {
        setOpen(true);
    };

    // Function to handle dialog closing
    const handleClose = () => {
        setOpen(false);
    };

    // Function to handle creating a new chatroom (you can add API call here)
    const handleCreateChatroom = async () => {
        // console.log('Creating chatroom with:', username);
        // Close the dialog
        handleClose();


        // Here you would typically make an API call to create the chatroom
        try {
            console.log("NewChatRoomDialog.js",{ currentUserId: currentUserId, currentUserType: userType, invitedUser: username, currentUserName: usernameSelf })

            const response = await fetch('/api/createNewChatRoom', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // Send the email as JSON in the request body
                body: JSON.stringify({ currentUserId: currentUserId, currentUserType: userType, invitedUser: username, currentUserName: usernameSelf }),
            })

            console.log(response)


            // Reset username field
            setUsername('');
        } catch (error) {
            console.error('Failed to create chat room:', error);
            // Reset username field
            setUsername('');
        }
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Start New Chatroom
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Start a New Chatroom</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Username"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleCreateChatroom}>Create</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default NewChatRoomDialog;
