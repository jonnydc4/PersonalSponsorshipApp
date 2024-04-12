import React from "react";
import "./JobListItem.css"

//generate an individual item in the job list
function JobListItem ({ job, selected, onClick }) {
    const { title, description} = job
    return (
        <div className={`job-list-item ${selected ? "selected" : ""}`} onClick={onClick}> {/* Add the .selected class if its the selected item */}
            <p>{title}</p>
            <p>{description}</p>
        </div>
)}

export default JobListItem;