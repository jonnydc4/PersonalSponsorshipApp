import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import ImportExportIcon from '@mui/icons-material/ImportExport';

// The following code servers as the InfluencerTrends component for the Home page. 
// This will display the influencer trends data boxes (4 boxes on top) with hardcoded data... for now. 

// Example hardcoded data with more concise formatting
const data = {
  marketTrends: "Instagram Reels",
  engagementRates: "3.5%",
  audienceGrowth: "10% last month",
  topPerformingPost: "50K likes",
  campaignOpportunities: "5 new partnerships"
};

function InfluencerTrends() {
  const loading = false;  // Simulate loading state

  return (
    // Hard coded data boxes to simlulate influencer trends
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, marginLeft: 2 }}>
      {/* <DataBox title="Market Trends" content={data.marketTrends} loading={loading} /> */}
      <DataBox title="Engagement Rates" content={data.engagementRates} loading={loading} />
      <DataBox title="Audience Growth" content={data.audienceGrowth} loading={loading} />
      <DataBox title="Top Performing Post" content={data.topPerformingPost} loading={loading} />
      <DataBox title="Campaign Opportunities" content={data.campaignOpportunities} loading={loading} />
    </Box>
  );
}

// Component for individual data boxes
function DataBox({ title, content, loading }) {
  return (
    <Box sx={{ width: 310, height: 130, display: 'flex', flexDirection: 'column', alignItems: 'left', justifyContent: 'center', backgroundColor: loading ? '#D4D4D4' : '#F6F6F6', padding: 2, borderRadius: '16px'}}>
      <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
        {title === "Audience Growth" ? <EmojiPeopleIcon /> : ''} {title === 'Engagement Rates' ? <ImportExportIcon /> : ''} {title}
      </Typography>
      <Typography variant="body2" component="div" sx={{fontWeight: 'bolder', fontSize: '25px'}}>
        {loading ? 'Loading...' : content}
      </Typography>
      <Typography variant="subtitle2" component="div" sx={{fontWeight: 'light', fontSize: '10px'}}>
        {title === "Audience Growth" ? <ImportExportIcon /> : '12%'} {'last month'}
      </Typography>
    </Box>
  );
}

export default InfluencerTrends;
