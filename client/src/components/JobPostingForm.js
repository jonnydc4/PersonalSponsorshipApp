// client/src/components/JobPostingForm.js
import React from 'react';

const JobPostingForm = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        // Will write this later where we send data to the server
        console.log('Job posted!');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Job Title:</label>
                <input type="text" id="title" name="title" required />
            </div>
            <div>
                <label htmlFor="description">Job Description:</label>
                <textarea id="description" name="description" required></textarea>
            </div>
            <div>
                <label htmlFor="location">Location:</label>
                <input type="text" id="location" name="location" required />
            </div>
            <button type="submit">Post Job</button>
        </form>
    );
};

export default JobPostingForm;
