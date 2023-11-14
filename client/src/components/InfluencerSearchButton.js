import React from 'react';
import { useNavigate } from 'react-router-dom';

const InfluencerSearchButton = ({ jobId }) => {
  const navigate = useNavigate();

  const handleSearchClick = () => {
    // Navigate to the influencer search route with the jobId
    navigate(`/job/${jobId}/influencer-search`);
  };

  return (
    <button onClick={handleSearchClick}>
      Influencer Search
    </button>
  );
};

export default InfluencerSearchButton;
