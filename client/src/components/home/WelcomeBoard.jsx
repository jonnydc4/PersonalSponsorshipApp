import React from 'react';
import { Typography, Box, Badge, Avatar } from '@mui/material';
import WavingHandIcon from '@mui/icons-material/WavingHand';

function WelcomeBoard({ userName }) {
    // Used to display a welcome message to the user - can be customized as it's within its
    // own component.  Therefore, you can add more elements to this component without messing up homepage.
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: 2, marginBottom: 5 }}>
      <Avatar alt="add description here" src="/add/source/here" sx={{ marginRight: 2, marginTop: 2, width: 56, height: 56}} />
      <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
        Welcome, {userName} <Badge color="primary">
          <WavingHandIcon color="action" fontSize="large" />
        </Badge>
      </Typography>
    </Box>
  );
}

export default WelcomeBoard;
