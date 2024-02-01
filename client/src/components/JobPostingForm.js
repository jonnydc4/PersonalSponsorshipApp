// client/src/components/JobPostingForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const JobPostingForm = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        // ... existing logic for form submission ...
    };

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="title"
                label="Job Title"
                name="title"
                autoComplete="title"
                autoFocus
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                id="description"
                label="Job Description"
                name="description"
                multiline
                rows={4}
                value={description}
                onChange={e => setDescription(e.target.value)}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                id="location"
                label="Location"
                name="location"
                autoComplete="location"
                value={location}
                onChange={e => setLocation(e.target.value)}
            />
            <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Post Job
            </Button>
        </Box>
    );
};

export default JobPostingForm;
