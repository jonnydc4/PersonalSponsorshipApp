// src/components/EditJobForm.js
import React, { useState, useEffect } from 'react';

function EditJobForm({ jobId, onSave }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Fetch job details from the backend and populate the form fields
    useEffect(() => {
      const fetchJobDetails = async () => {
        setIsLoading(true);
        setError('');
        try {
            const response = await fetch(`http://localhost:3000/api/jobs/${jobId}`);
            const job = await response.json();
            setTitle(job.title);
            setDescription(job.description);
            setLocation(job.location);
        } catch (error) {
            console.error('Failed to fetch job details:', error);
            setError('Failed to load job details.');
        } finally {
          setIsLoading(false);
      }
      };

      if (jobId) {
          fetchJobDetails();
      }
  }, [jobId]);

    const handleSubmit = async (event) => {
        //event.preventDefault();
        const updatedJob = { title, description, location };
        onSave(jobId, updatedJob);
    };

    return (
      <form onSubmit={handleSubmit}>
          {error && <p className="error">{error}</p>}
          <div>
              <label htmlFor="title">Job Title:</label>
              <input
                  type="text"
                  id="title"
                  name="title"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  required
              />
          </div>
          <div>
              <label htmlFor="description">Job Description:</label>
              <textarea
                  id="description"
                  name="description"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  required
              />
          </div>
          <div>
              <label htmlFor="location">Location:</label>
              <input
                  type="text"
                  id="location"
                  name="location"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  required
              />
          </div>
          <button type="submit" disabled={isLoading}>Save Changes</button>
      </form>
  );
}


export default EditJobForm;
