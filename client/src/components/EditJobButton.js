import React from 'react';
import { useNavigate } from 'react-router-dom';

// Serves to edit the details of a job (from the company side)
const EditJobButton = ({ jobId }) => {
  const navigate = useNavigate();

  const handleSearchClick = () => {
    // Navigate to the edit job form with the jobId
    if (jobId) {
      navigate(`/job/${jobId}/influencer-search`);
    } else {
      console.error("Job ID is undefined");
    }
  };

  return (
    <button onClick={handleSearchClick}>
      Edit Job
    </button>
  );
};

export default EditJobButton;
