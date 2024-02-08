import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditJobForm() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`/api/specificJob/${jobId}`);
        if (!response.ok) throw new Error('Failed to fetch job details');
        const { rows } = await response.json();
        const job = rows[0]; // [rows[0] is imporant or the information wont display properly]
        setTitle(job.title);
        setDescription(job.description);
        setLocation(job.location);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching job details:', error);
        setLoading(false);
      }
    };

    if (jobId) fetchJobDetails();
  }, [jobId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/updateJob/${jobId}`, {
        method: 'PATCH', // or 'PUT', depending on your API
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, location }),
      });
      if (!response.ok) throw new Error('Failed to update job details');
      // Redirect or do something upon success
      navigate('/manage-jobs'); // Adjust the redirect path as needed
    } catch (error) {
      console.error('Error updating job details:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!jobId) return <p>Job not found</p>;

  return (
    <div className="edit-job-container">
      <h1>Edit Job Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label>Location:</label>
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditJobForm;




