import React from 'react';
import JobListItem from './JobListItem';

function JobsList ({ jobs, selectedJobId, onJobClick, onCreateJobClick }) {
    return (
        <>
            <button onClick={onCreateJobClick}>Create new job</button>
            {jobs.map(
                job => {
                    return (
                        <JobListItem
                            key={job.id}
                            job={job}
                            selected={job.id == selectedJobId}
                            onClick={() => onJobClick(job)}
                        />
                    )
                }
            )}
        </>
    )
}

export default JobsList;