import React, { useEffect, useState } from 'react';
import CommonFrame from '../../components/CommonFrame';
import InfluencerSearchButton from '../../components/InfluencerSearchButton';
import JobPostingForm from '../../components/JobPostingForm';
import InfluencerSearch from '../../InfluencerSearch'; // Import the actual component
import { Typography } from '@mui/material';

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
        setJobs(data.map(job => ({ ...job, name: job.title })));
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
    setSelectedJob(job);
    setShowInfluencerSearch(false); // Explicitly reset the influencer search view
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
            <InfluencerSearch jobId={selectedJob?.id} />
        ) : selectedJob ? (
            <>
              <Typography variant="h6">Edit Job: {selectedJob.title}</Typography>
              <InfluencerSearchButton jobId={selectedJob.id} onSearchClick={handleInfluencerSearch} />
            </>
        ) : (
            <JobPostingForm onJobPost={addJobToList} />
        )}
      </CommonFrame>
  );
};

export default JobManagerPage;
