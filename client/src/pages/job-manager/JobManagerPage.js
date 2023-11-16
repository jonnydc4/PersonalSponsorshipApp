import React, {useEffect, useState}  from 'react';
import ListDetailFrame from '../../components/ListDetailFrame';
import JobsList from './components/JobsList';
import PageContainer from '../../components/PageContainer';
import InfluencerSearchButton from '../../components/InfluencerSearchButton';
import JobPostingForm from '../../components/JobPostingForm';

const COMPANY_ID = 1

function JobManagerPage() {
  const [jobs, setJobs] = useState([])
  const [selectedJobId, setSelectedJobId] = useState(null)
  
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/jobs/${COMPANY_ID}`);
        const data = await response.json();
        setJobs(data);
      } catch (e) {
        console.error("Fetching jobs failed: ", e);
      }
    };
    fetchJobs();
  }, [setJobs])

  
  return (
    <PageContainer>
      <ListDetailFrame
        renderList={ 
          <JobsList
            jobs={jobs}
            selectedJobId={selectedJobId}
            onJobClick={(job) => setSelectedJobId(job.id) }
            onCreateJobClick={() => setSelectedJobId(null)}
          /> 
        }
        renderDetail={
          <div style={{height: '100%', width: '100%'}}>
            {selectedJobId == null ?
            <JobPostingForm />
            : <p>Edit job: {selectedJobId}</p>
            }
            <InfluencerSearchButton jobId={selectedJobId}/>
          </div>
        }
      />
      
    </PageContainer>
  )
}

export default JobManagerPage;

