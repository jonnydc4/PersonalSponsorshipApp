import React, { useEffect, useState } from 'react';
import CommonFrame from '../../components/CommonFrame';
import InfluencerSearchButton from '../../components/InfluencerSearchButton';
import JobPostingForm from '../../components/JobPostingForm';
import InfluencerSearch from '../../InfluencerSearch'; // Import the actual component
import { Typography, Button } from '@mui/material';
import EditJobForm from '../job-manager/components/EditJobForm'
const JobManagerPage = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showInfluencerSearch, setShowInfluencerSearch] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      const userId = localStorage.getItem('userId');
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/jobs/${userId}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        // console.log('Fetched Jobs:', data); // Add this log to inspect the structure
        setJobs(data.map(job => ({ ...job, name: job.title }))); // Check if you need to use job._id here
      } catch (e) {
        console.error("Fetching jobs failed: ", e);
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, []);


  const handleJobClick = (job) => {
    // console.log('Selected job with ID:', job._id); // Make sure job._id is not undefined
    // console.log('Selected entire job: ', job);
    setSelectedJob(job);
    setShowInfluencerSearch(false);
  };


  const handleInfluencerSearch = () => {
    setShowInfluencerSearch(true); // Show the influencer search component
  };

  const addJobToList = (newJob) => {
    setJobs(prevJobs => [...prevJobs, { ...newJob, name: newJob.title }]);
  };



  return (
    <CommonFrame items={jobs} onSelectItem={handleJobClick}>
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : showInfluencerSearch ? (
        <InfluencerSearch jobId={selectedJob?._id} />
      ) : selectedJob ? (
        <>
          <Typography variant="h6">
            
            <Button variant="contained" color="primary" onSearchClick={EditJobForm}>
              Edit Job: {selectedJob.title}
            </Button>
          </Typography>
          <InfluencerSearchButton jobId={selectedJob._id} onSearchClick={handleInfluencerSearch} />
        </>
      ) : (
        <JobPostingForm onJobPost={addJobToList} />
      )}
    </CommonFrame>
  );
};

export default JobManagerPage;
