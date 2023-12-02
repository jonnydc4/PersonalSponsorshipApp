import React from 'react';
import { useNavigate } from 'react-router-dom';

const InfluencerSearchButton = ({ jobId }) => {
  const navigate = useNavigate();

  const handleSearchClick = () => {
    // Navigate to the influencer search route with the jobId
    if (jobId) {
      navigate(`/job/${jobId}/influencer-search`);
    } else {
      console.error("Job ID is undefined");
    }
  };

  return (
    <button onClick={handleSearchClick}>
      Influencer Search
    </button>
  );
};

export default InfluencerSearchButton;
