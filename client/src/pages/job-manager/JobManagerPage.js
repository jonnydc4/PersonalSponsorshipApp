import React, { useEffect, useState } from 'react';
import CommonFrame from '../../components/CommonFrame'; // Adjust the import path as necessary

import JobsList from './components/JobsList';
import InfluencerSearchButton from '../../components/InfluencerSearchButton';
import JobPostingForm from '../../components/JobPostingForm';
import { Typography } from '@mui/material';

const JobManagerPage = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      const userId = localStorage.getItem('userId');
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/jobs/${userId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const jobsWithNames = data.map(job => ({ ...job, name: job.title })); // Modify this line as needed
        setJobs(jobsWithNames);
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
  };

  const addJobToList = (newJob) => {
    setJobs(prevJobs => [...prevJobs, { ...newJob, name: newJob.title }]);
  };

  const items = jobs.map(job => ({
    ...job,
    onClick: () => handleJobClick(job),
  }));

  return (
      <CommonFrame
          items={items}
          onSelectItem={setSelectedJob}
      >
        {isLoading ? (
            <Typography>Loading...</Typography>
        ) : (
            <>
              {selectedJob === null ? (
                  <JobPostingForm onJobPost={addJobToList} />
              ) : (
                  <>
                    <Typography variant="h6">Edit Job: {selectedJob.title}</Typography>
                    <InfluencerSearchButton jobId={selectedJob.id} />
                  </>
              )}
            </>
        )}
      </CommonFrame>
  );
};

export default JobManagerPage;
