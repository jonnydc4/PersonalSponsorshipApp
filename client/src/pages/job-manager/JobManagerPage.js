import React, {useState}  from 'react';
import ListDetailFrame from '../../components/ListDetailFrame';
import JobsList from './components/JobsList';
import PageContainer from '../../components/PageContainer';
import '.../InfluencerSearchButton';
import InfluencerSearchButton from '../../components/InfluencerSearchButton';

function JobManagerPage() {
  const [jobs, setJobs] = useState([{title: "Title", description: "Description"}])
  return (
    <PageContainer>
      <ListDetailFrame renderList={ <JobsList jobs={jobs} /> } renderDetail={<div>Coming soon 👷‍♂️</div>} />
      <InfluencerSearchButton jobId={id}/>
    </PageContainer>
  )
}

export default JobManagerPage;

