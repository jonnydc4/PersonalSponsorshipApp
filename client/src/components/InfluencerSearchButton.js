import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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
    <Button
      onClick={handleSearchClick}
      variant="contained"
      color="primary"
      disableElevation
    >
      Influencer Search
    </Button>
  );
};

export default InfluencerSearchButton;
