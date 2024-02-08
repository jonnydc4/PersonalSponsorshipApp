import React, {useEffect, useState}  from 'react';
import ListDetailFrame from '../../components/ListDetailFrame';
import JobsList from './components/JobsList';
import PageContainer from '../../components/PageContainer';
import InfluencerSearchButton from '../../components/InfluencerSearchButton';
import JobPostingForm from '../../components/JobPostingForm';

const userId = localStorage.getItem('userId')

function JobManagerPage() {
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  /*useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`/api/jobs/${userId}`);
        console.log("Data:")
        const data = await response.json();
        console.log(data)
        setJobs(data);
      } catch (e) {
        console.error("Fetching jobs failed: ", e);
      }
    };
    fetchJobs();
  }, [setJobs]) */

  const addJobToList = (newJob) => {
    setJobs(prevJobs => [...prevJobs, newJob]);
  };


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
        setJobs(data);
      } catch (e) {
        console.error("Fetching jobs failed: ", e);
        setError(e.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);


  return (
      <PageContainer>
        {isLoading ? (
            <p>Loading...</p>
        ) : (
            <ListDetailFrame
                renderList={
                  <JobsList
                      jobs={jobs}
                      selectedJobId={selectedJobId}
                      onJobClick={(job) => setSelectedJobId(job.id)}
                      onCreateJobClick={() => setSelectedJobId(null)}
                  />
                }
                renderDetail={
                  <div style={{height: '100%', width: '100%'}}>
                    {selectedJobId == null ?
                        // Pass the addJobToList function as a prop to JobPostingForm
                        <JobPostingForm onJobPost={addJobToList} />
                        :
                        <div>
                          <p>Edit job: {selectedJobId}</p> {/* You might need to adjust this to show job details */}
                          <InfluencerSearchButton jobId={selectedJobId}/>
                        </div>
                    }
                  </div>
                }
            />
        )}
      </PageContainer>
  );
}

export default JobManagerPage;

