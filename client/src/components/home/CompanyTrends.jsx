import React from 'react';
import Box from '@mui/material/Box';
import Grow from '@mui/material/Grow';
import Typography from '@mui/material/Typography';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

// Hardcoded data to simulate company trends
const data = {
  industryGrowth: "2.5% increase",
  revenueGrowth: "15% this quarter",
  newPartnerships: "3 major deals",
  marketExpansion: "Entered 2 new countries"
};

function CompanyTrends() {
  const loading = false;  // Simulate loading state

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, marginLeft: 2 }}>
      <DataBox title="Industry Growth" content={data.industryGrowth} loading={loading} icon={<TrendingUpIcon />} index={0}/>
      <DataBox title="Revenue Growth" content={data.revenueGrowth} loading={loading} icon={<BusinessCenterIcon />} index={1}/>
      <DataBox title="New Partnerships" content={data.newPartnerships} loading={loading} icon={<BusinessCenterIcon />} index={2}/>
      <DataBox title="Market Expansion" content={data.marketExpansion} loading={loading} icon={<TrendingUpIcon />} index={3}/>
    </Box>
  );
}

// Component for individual data boxes
function DataBox({ title, content, loading, icon, index}) {
  return (
    <Grow
      in={true}
      style={{ transformOrigin: '0 0 0' }}
      {...(index !== undefined ? { timeout: 1000 + index * 500 } : {})}
    >
      <Box sx={{
        width: 310,
        height: 130,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        justifyContent: 'center',
        backgroundColor: loading ? '#D4D4D4' : '#F6F6F6',
        boxShadow: 1,
        padding: 2,
        borderRadius: '16px'
      }}>
        <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
          {icon} {title}
        </Typography>
        <Typography variant="body2" component="div" sx={{ fontWeight: 'bolder', fontSize: '25px' }}>
          {loading ? 'Loading...' : content}
        </Typography>
        <Typography variant="subtitle2" component="div" sx={{ fontWeight: 'light', fontSize: '10px' }}>
          {'last updated this quarter'}
        </Typography>
      </Box>
    </Grow>
  );
}

export default CompanyTrends;
