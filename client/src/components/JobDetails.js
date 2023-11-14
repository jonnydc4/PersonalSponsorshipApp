import React from 'react';

const JobDetails = ({ job, onAccept, onReject }) => {
    if (!job) {
        return <p>Select a job to view details and options.</p>;
    }

    return (
        <div>
            <h2>{job.title}</h2>
            <p>{job.description}</p>
            <button onClick={() => onAccept(job)}>Accept Job</button>
            <button onClick={() => onReject(job)}>Reject Job</button>
        </div>
    );
};

export default JobDetails;
