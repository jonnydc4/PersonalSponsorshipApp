import React from 'react';

//Initial edit job form
function EditJobForm({ jobId}) { 
  const companyName = localStorage.getItem('userId');
  return (
    <div className="edit-job-container">
      <h1>EDIT JOB FORM</h1>
      {/* Correctly display the jobId and userId/companyId if provided */}
      <p>Editing Job ID: {jobId} &amp; Company Id: {companyName}</p>
    </div>
  );
}

export default EditJobForm;




