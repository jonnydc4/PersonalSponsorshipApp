// JobsList.js
// A component for rendering a list of jobs. It displays each job as a JobListItem and
// provides a button to create a new job.

import React from 'react';
import JobListItem from './JobListItem';

/**
 * Renders a list of jobs along with a button to create a new job.
 * @param {Object[]} jobs - Array of job objects to be displayed.
 * @param {number} selectedJobId - The ID of the currently selected job.
 * @param {Function} onJobClick - Callback function that is called when a job is clicked.
 * @param {Function} onCreateJobClick - Callback function that is called when the 'Create new job' button is clicked.
 */
function JobsList({ jobs, selectedJobId, onJobClick, onCreateJobClick }) {
    return (
        // React fragment to group the list of jobs and the create button without adding extra nodes to the DOM.
        <>
            {/* Button to trigger the job creation process. */}
            <button onClick={onCreateJobClick}>Create new job</button>
            {/* Map through the jobs array and render a JobListItem for each job. */}
            {jobs.map(job => (
                <JobListItem
                    key={job.id} // Unique key for each list item for React's reconciliation process.
                    job={job} // The job object containing the details of a job.
                    selected={job.id === selectedJobId} // Boolean to indicate if the job is the selected one.
                    onClick={() => onJobClick(job)} // Callback for when a job item is clicked.
                />
            ))}
        </>
    );
}

// Export the JobsList component for use in other parts of the application.
export default JobsList;
