import React from 'react';
import { useNavigate } from 'react-router-dom';

// Serves to edit the details of a job (from the company side)
const EditJobButton = ({ jobId}) => {
  const navigate = useNavigate();
  console.log("Received Job ID in EditJobButton:", jobId);
  const handleEditClick = () => {
    // Navigate to the edit job form with the jobId
    if (jobId) {
      navigate(`/job/${jobId}/edit`);
    } else {
      console.error("Job ID or User ID is undefined");
    }
  };

  return (
    <button onClick={handleEditClick}>
      Edit Job
    </button>
  );
};

export default EditJobButton;
