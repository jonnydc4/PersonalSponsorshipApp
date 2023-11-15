import React from "react";
import "./JobListItem.css"

function JobListItem ({ job, selected, onClick }) {
    const { title, description} = job
    return (
        <div className={`job-list-item ${selected ? "selected" : ""}`} onClick={onClick}>
            <p>{title}</p>
            <p>{description}</p>
        </div>
)}

export default JobListItem;