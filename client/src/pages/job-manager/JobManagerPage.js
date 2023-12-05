// JobManagerPage.js
// This component serves as the main page for job management within the application.
// It facilitates the creation, display, and selection of jobs for a given company.

import React, { useEffect, useState } from 'react';
import ListDetailFrame from '../../components/ListDetailFrame';
import JobsList from './components/JobsList';
import PageContainer from '../../components/PageContainer';
import InfluencerSearchButton from '../../components/InfluencerSearchButton';
import JobPostingForm from '../../components/JobPostingForm';
import EditJobForm from './components/EditJobForm';

// Set a constant for company ID to fetch related jobs
const COMPANY_ID = 1;

function JobManagerPage() {
  // State hook for storing the list of jobs
  const [jobs, setJobs] = useState([]);
  // State hook for tracking the selected job ID
  const [selectedJobId, setSelectedJobId] = useState(null);

  // Effect hook to fetch jobs from the API when the component mounts or jobs state updates
  useEffect(() => {
    // Asynchronous function to fetch job data from the backend
    const fetchJobs = async () => {
      try {
        // API call to retrieve jobs for the specified company ID
        const response = await fetch(`http://localhost:3000/api/jobs/${COMPANY_ID}`);
        const data = await response.json();
        // Update state with the fetched jobs
        setJobs(data);
      } catch (e) {
        // Log errors to the console if the fetch operation fails
        console.error("Fetching jobs failed: ", e);
      }
    };
    fetchJobs();
  }, [setJobs]);

  const handleSaveEdit = async (id, jobData) => {
    try {
      // Make a PUT request to update the job
      const response = await fetch(`http://localhost:3000/api/jobs/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
      });

      if (response.ok) {
        // If the update was successful, refetch the jobs list
        const updatedJobs = await response.json();
        setJobs(updatedJobs);
        // Optionally, reset the selectedJobId or navigate the user away from the edit form
        setSelectedJobId(null);
      } else {
        // If the server responded with an error, handle it here
        console.error('Failed to update the job:', response.statusText);
        // TODO: Implement user-friendly error handling
      }
    } catch (error) {
      // If there was an error sending the request, handle it here
      console.error('Failed to send update job request:', error);
      // TODO: Implement user-friendly error handling
    }
  };

  // Render the page layout using PageContainer and ListDetailFrame for listing jobs and details
  return (
    <PageContainer>
      <ListDetailFrame
        // Prop to render the list of jobs. JobsList component manages the display and selection of jobs.
        renderList={ 
          <JobsList
            jobs={jobs}
            selectedJobId={selectedJobId}
            onJobClick={(job) => setSelectedJobId(job.id)}
            onCreateJobClick={() => setSelectedJobId(null)}
          /> 
        }
        // Prop to render the detail view. Conditionally displays the JobPostingForm or job edit details.
        renderDetail={
          <div style={{ height: '100%', width: '100%' }}>
            {selectedJobId == null ?
              // Render the job posting form if no job is selected
              <JobPostingForm />
              :
              // Display editable details for the selected job
              <EditJobForm
                jobId={selectedJobId}
                onSave={(id, jobData) => handleSaveEdit(id, jobData)}
              />
            }
            {/* InfluencerSearchButton is rendered regardless of job selection*/}
            <InfluencerSearchButton jobId={selectedJobId}/>
          </div>
        }
      />
    </PageContainer>
  );

  
}

// Export the JobManagerPage component for use in the application
export default JobManagerPage;
