// client/src/components/JobPostingForm.js
import React, { useState } from 'react';

const JobPostingForm = () => {
    // Define state hooks for each form input
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Will write this later where we send data to the server
        try {
            // Prepare data to be sent
            const formData = { title, description, location };
            // Send a POST request with the form data
            const response = await fetch('/postJob', {
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
                

                // If the job is posted successfully, call the "allJobs" endpoint to fetch all jobs
                const allJobsResponse = await fetch('/allJobs');
                if (allJobsResponse.ok) {
                    const allJobsData = await allJobsResponse.json();
                    //console.log('All jobs:', allJobsData);
                } else {
                    console.error('Error fetching all jobs:', response.statusText);
                }
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
