// client/src/components/JobPostingForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';

const JobPostingForm = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');

    // Retrieve the user ID from local storage
    const userId = localStorage.getItem('userId');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = { title, description, location, companyId: userId };
            const response = await fetch('/api/postJob', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('Job posted!');
                setTitle('');
                setDescription('');
                setLocation('');
                navigate(-1); // Navigate to the previous page
            } else {
                console.error('Error posting the job:', response.statusText);
            }
        } catch (error) {
            console.error('There was an error posting the job:', error);
        }
    };

    return (
        <Container component="main" maxWidth="sm">
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3, display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                <TextField
                    variant="outlined"
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
                    variant="outlined"
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
                    variant="outlined"
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
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Post Job
                </Button>
            </Box>
        </Container>
    );
};

export default JobPostingForm;
