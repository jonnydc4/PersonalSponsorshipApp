import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

//Initial edit job form
function EditJobForm({ }) {
  // const companyName = localStorage.getItem('userId');
  // const { jobId } = useParams();

  // console.log("Received Job ID in EditJobForm:", jobId);
  // return (
  //   <div className="edit-job-container">
  //     <h1>EDIT JOB FORM</h1>
  //     <p>Editing Job ID: {jobId} &amp; Company Id: {companyName}</p>
  //   </div>
  // );
  const { jobId } = useParams(); // Extract jobId from URL
  const [job, setJob] = useState(null); // State to store the job details
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    // Define the function to fetch job details
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`/api/specificJob/${jobId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch job details');
        }
        const data = await response.json();
        console.log(data.title);
        setJob(data); // Store the job details in state
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching job details:', error);
        setLoading(false); // Ensure loading is false even if there's an error
      }
    };

    if (jobId) {
      fetchJobDetails(); // Call the function if jobId is available
    }
  }, [jobId]); // This effect depends on jobId

  if (loading) return <p>Loading...</p>; // Display loading state

  if (!job) return <p>Job not found</p>; // Display if no job is found or if there was an error fetching

  // Render the job details
  return (
    <div className="edit-job-container">
      <h1>Edit Job Form</h1>
      <p>Editing Job ID: {jobId}</p>
      <div>
        {/* <p>{JSON.stringify(job)}</p> */}
        <p><strong>Title:</strong> {job.title}</p>
        <p><strong>Description:</strong> {job.description}</p>
        <p><strong>Location:</strong> {job.location}</p>
      </div>
    </div>
  );
}

export default EditJobForm;




