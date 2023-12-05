// JobListItem.js
// A component that represents a single item in the job list. It displays the job's title
// and description and highlights if it's the currently selected job.

import React from "react";
import "./JobListItem.css";

/**
 * Renders an individual job item in a list.
 * @param {Object} job - Object containing the job's information.
 * @param {boolean} selected - Indicates whether this job item is currently selected.
 * @param {Function} onClick - Callback function to be called when the job item is clicked.
 */
function JobListItem({ job, selected, onClick }) {
    // Destructure the title and description from the job object.
    const { title, description } = job;

    return (
        // The div represents a job list item. The 'selected' class is added dynamically based on the 'selected' prop.
        <div className={`job-list-item ${selected ? "selected" : ""}`} onClick={onClick}>
            <p>{title}</p> {/* Display the job title */}
            <p>{description}</p> {/* Display the job description */}
        </div>
    );
}

// Export the JobListItem component for use in other parts of the application.
export default JobListItem;
