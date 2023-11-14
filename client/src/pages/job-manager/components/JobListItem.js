import React from "react";

function JobListItem ({ job }) {
    const { title, description} = job
    return (
        <div>
            <p>{title}</p>
            <p>{description}</p>
        </div>
)}

export default JobListItem;