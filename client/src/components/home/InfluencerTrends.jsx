import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grow from '@mui/material/Grow';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import BusinessIcon from '@mui/icons-material/Business';

const data = {
  marketTrends: "Instagram Reels",
  engagementRates: "3.5%",
  audienceGrowth: "10% last month",
  topPerformingPost: "50K likes",
  campaignOpportunities: "5 new partnerships"
};

function InfluencerTrends() {
  const loading = false;

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, marginLeft: 2 }}>
      <DataBox title="Engagement Rates" content={data.engagementRates} loading={loading} icon={<ImportExportIcon />} index={0}/>
      <DataBox title="Audience Growth" content={data.audienceGrowth} loading={loading} icon={<EmojiPeopleIcon />} index={1}/>
      <DataBox title="Top Performing Post" content={data.topPerformingPost} loading={loading} icon={<EmojiEventsIcon />} index={2}/>
      <DataBox title="Campaign Opportunities" content={data.campaignOpportunities} loading={loading} icon={<BusinessIcon />} index={3}/>
    </Box>
  );
}

function DataBox({ title, content, loading, icon, index }) {
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
          {title === "Audience Growth" ? '12% last month' : ''}
        </Typography>
      </Box>
    </Grow>
  );
}

export default InfluencerTrends;
