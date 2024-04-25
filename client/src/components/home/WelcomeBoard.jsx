import React from 'react';
import { Typography, Badge } from '@mui/material';
import WavingHandIcon from '@mui/icons-material/WavingHand';

function WelcomeBoard({ userName }) {
    // Used to display a welcome message to the user - can be customized as it's within its
    // own component.  Therefore, you can add more elements to this component without messing up homepage.
  return (
    <Typography variant="h4" sx={{ fontWeight: 'bold', marginLeft: 2, marginBottom: 5 }}> {/* You can modify padding here */}
      Welcome, {userName} <Badge color="primary">
        <WavingHandIcon color="action" fontSize="large" />
      </Badge>
    </Typography>
  );
}

export default WelcomeBoard;
