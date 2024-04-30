import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/authContext';
import { Typography, Avatar, Box, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const ProfilePage = () => {
    const { currentUser } = useAuth();
    const [editMode, setEditMode] = useState(false);
    const [profile, setProfile] = useState({
        userType: localStorage.getItem('userType'),
        username: localStorage.getItem('userName'),
        name: '',
        phoneNumber: '',
        about: '',
        email: currentUser.email || ' '
    });

    useEffect(() => {
        const fetchUserProfile = async () => {
            console.log(currentUser.uid)
            const endpoint = `/api/getUserTypeByID?id=${currentUser.uid}`;
            const response = await fetch(endpoint);
            const data = await response.json();
            if (response.ok) {
                if (localStorage.getItem('userType') === 'company' && !data.userData.username) {
                    data.userData.username = data.userData.name;
                }
                setProfile(prev => ({ ...prev, ...data.userData }));
            } else {
                console.error('Failed to fetch user data');
            }
        };

        fetchUserProfile();
    }, [currentUser.uid, profile.userType]);

    const handleChange = (prop) => (event) => {
        setProfile({ ...profile, [prop]: event.target.value });
    };

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleClose = () => {
        setEditMode(false);
    };

    const handleSave = async () => {
        const endpoint = profile.userType === 'company' ? `/api/updateCompany?id=${currentUser.uid}` : `/api/updateInfluencer?id=${currentUser.uid}`;
        const profileData = {
            userType: profile.userType,
            username: profile.username || profile.name,
            name: profile.name,
            phoneNumber: profile.phoneNumber,
            about: profile.aboutMe,
            email: currentUser.email || ' '
        }
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...profileData, userId: currentUser.uid }),
            });

            if (response.ok) {
                setEditMode(false);
            } else {
                throw new Error('Failed to update profile... Index:');
            }
        } catch (error) {
            console.error('Failed to update profile... Index2:', error);
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, p: 3 }}>
            <Typography variant="h4" gutterBottom>User Profile</Typography>
            <Avatar sx={{ width: 56, height: 56, bgcolor: 'primary.main' }}>
                {profile.username[0] || profile.name[0] || 'U'}
            </Avatar>
            <Typography variant="h6">{profile.username || profile.name}</Typography>
            {!editMode && (
                <Box sx={{ width: '100%' }}>
                    <Typography variant="body1"><strong>Email:</strong> {profile.email}</Typography>
                    <Typography variant="body1"><strong>Phone Number:</strong> {profile.phoneNumber}</Typography>
                    <Typography variant="body1"><strong>About:</strong> {profile.about}</Typography>
                </Box>
            )}
            <Button onClick={handleEdit} variant="outlined" sx={{ mb: 2 }}>Edit Profile</Button>
            <Dialog open={editMode} onClose={handleClose}>
                <DialogTitle>Edit Your Profile</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label={profile.userType === 'company' ? "Company Name" : "Username"}
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={profile.userType === 'company' ? profile.name : profile.username}
                        onChange={handleChange(profile.userType === 'company' ? 'name' : 'username')}
                    />
                    <TextField
                        margin="dense"
                        id="email"
                        label="Email"
                        type="email"
                        fullWidth
                        variant="outlined"
                        value={profile.email}
                        onChange={handleChange('email')}
                    />
                    <TextField
                        margin="dense"
                        id="phoneNumber"
                        label="Phone Number"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={profile.phoneNumber}
                        onChange={handleChange('phoneNumber')}
                    />
                    <TextField
                        margin="dense"
                        id="about"
                        label="About Me"
                        type="text"
                        multiline
                        rows={4}
                        fullWidth
                        variant="outlined"
                        value={profile.aboutMe}
                        onChange={handleChange('aboutMe')}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save Changes</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default ProfilePage;
