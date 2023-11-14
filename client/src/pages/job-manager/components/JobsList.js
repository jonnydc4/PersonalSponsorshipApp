import React from 'react';
import JobListItem from './JobListItem';

function JobsList ({ jobs }) {
    return (
        <div>
            {jobs.map(job => <JobListItem job={job} />)}
        </div>
  )
}

export default JobsList;