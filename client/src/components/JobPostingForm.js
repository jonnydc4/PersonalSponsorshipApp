// client/src/components/JobPostingForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './JobPostingForm.css';

const JobPostingForm = () => {
    // Define state hooks for each form input
    const navigate = useNavigate(); // creates variable to hold the history of webpages navigated to.
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');

    const userId = localStorage.getItem('userId')

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Will write this later where we send data to the server
        try {
            // Prepare data to be sent
            const formData = { title, description, location, companyId: userId };
            // Send a POST request with the form data
            const response = await fetch('/api/postJob', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('Job posted!');
                // Optionally, clear the form fields after successful post
                setTitle('');
                setDescription('');
                setLocation('');

                navigate('/');
                navigate(-1);
            } else {
                console.error('Error posting the job:', response.statusText);
            }
        } catch (error) {
            console.error('There was an error posting the job:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Job Title:</label>
                <input type="text" id="title" name="title" value={title}
                onChange={e => setTitle(e.target.value)}
                required />
            </div>
            <div>
                <label htmlFor="description">Job Description:</label>
                <textarea id="description" name="description" value={description}
                onChange={e => setDescription(e.target.value)}
                required></textarea>
            </div>
            <div>
                <label htmlFor="location">Location:</label>
                <input type="text" id="location" name="location" value={location}
                onChange={e => setLocation(e.target.value)}
                required />
            </div>
            <button type="submit">Post Job</button>
        </form>
    );
};

export default JobPostingForm;
