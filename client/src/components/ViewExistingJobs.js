import React, { useState, useEffect } from 'react';
import CommonFrame from './CommonFrame';
import JobList from './JobList'; // Make sure this component is designed to accept a list of jobs
import JobPostingForm from './JobPostingForm';
import JobEditForm from './JobEditForm'; // or any other form you use for editing
import { useParams } from 'react-router-dom';

const JobsPage = ({ companyId }) => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { companyId } = useParams();

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/jobs/${companyId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setJobs(data); // Assuming the data is the array of jobs
      } catch (e) {
        setError(e.message);
        console.error("Fetching jobs failed: ", e);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [companyId]);

  const handleJobSelect = (job) => {
    setSelectedJob(job);
  };

  // Render loading, error, or the full component based on the state
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <CommonFrame>
      <div className="jobsPageContainer">
        <aside className="jobListPanel">
          <JobList jobs={jobs} onJobSelect={handleJobSelect} />
        </aside>
        <main className="jobFormPanel">
          {selectedJob ? (
            <JobEditForm job={selectedJob} />
          ) : (
            <JobPostingForm />
          )}
        </main>
      </div>
    </CommonFrame>
  );
};

export default JobsPage;
