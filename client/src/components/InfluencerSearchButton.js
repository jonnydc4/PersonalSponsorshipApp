import React from 'react';

const InfluencerSearchButton = ({ jobId, onSearchClick }) => {
  return (
      <button onClick={() => onSearchClick(jobId)}>
        Influencer Search
      </button>
  );
};

export default InfluencerSearchButton;
