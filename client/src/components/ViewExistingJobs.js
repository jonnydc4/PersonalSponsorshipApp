// JobSearchPage.jsx
import React, { useState, useEffect } from 'react';
import CommonFrame from './CommonFrame'; // Adjust the path as needed
import JobList from './JobList'; // Adjust the path as needed
import JobDetails from './JobDetails'; // Adjust the path as needed

const BASE_URL = 'http://localhost:3000'; // Your server URL

const fetchJobsForCompany = async (companyId) => {
  try {
    const response = await fetch(`${BASE_URL}/jobs/${companyId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const jobs = await response.json();
    return jobs;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
};


const JobSearchPage = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);

  // Replace `companyId` with the actual logged-in company ID retrieved from the user's session or authentication context
  const companyId = 1;//retrieveLoggedInCompanyId(); 

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const companyJobs = await fetchJobsForCompany(companyId);
        setJobs(companyJobs);
      } catch (error) {
        console.error('Failed to load jobs', error);
        // Handle error, maybe set some error state and show it in UI
      }
    };

    loadJobs();
  }, [companyId]);

  return (
    <CommonFrame>
      <JobList jobs={jobs} onSelectJob={setSelectedJob} />
      {selectedJob && <JobDetails job={selectedJob} onSave={handleSave} />}
      {/* Button and other UI components */}
    </CommonFrame>
  );
};

// This function simulates the retrieval of the logged-in company's ID
function retrieveLoggedInCompanyId() {
  // TODO: Implement logic to retrieve company ID from the user's session or authentication context
  return 'company-id-from-session';
}

// This function handles saving the job description
function handleSave(updatedJob) {
  // TODO: Implement logic to save the updated job description to the database
  console.log('Save job description:', updatedJob);
}

export default JobSearchPage;
