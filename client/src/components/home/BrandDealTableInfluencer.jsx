import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

function createData(jobTitle, companyName, inquiryDate, status, action) {
  // This function is used to create a row object for the table
  return { jobTitle, companyName, inquiryDate, status, action };
}

const fetchData = async () => {
  // This is used to fetch all the jobs for a user, and display them on the dashboard 
  const userId = localStorage.getItem('userId'); 
  console.log(userId);
  try {
    const response = await fetch(`/api/jobs/${userId}`);
    const data = await response.json();
    // Map the response data to match the format expected by the table
    return data.map(job => createData(
      job.title, 
      job.companyName, 
      job.inquiryDate, 
      job.status, 
      job.action, 
      'View Applicants' 
    ));
  } catch (error) {
    console.error('Error fetching job offers:', error);
    return []; // Return an empty array on error
  }
};

export default function BrandDealTableInfluencer() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetchData().then(setRows); // Fetch data on component mount and set it to rows
  }, []); // Empty dependency array to run only once on mount

  return (
    <TableContainer component={Paper} sx={{marginLeft: 2, borderRadius: '16px'}}>
      <Table sx={{ minWidth: 650}} aria-label="influencer campaign table">
        <TableHead>
          <TableRow>
            <TableCell>Job Title</TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Inquiry Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length > 0 ? rows.map((row) => (
            <TableRow key={row.campaignName}>
              <TableCell component="th" scope="row">
                {row.campaignName}
              </TableCell>
              <TableCell>{row.totalApplicants}</TableCell>
              <TableCell>{row.topApplicants}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>
                <Button variant="contained" color="primary" onClick={() => alert('View Application')}>
                  {row.action}
                </Button>
              </TableCell>
            </TableRow>
          )) : (
            <TableRow>
              <TableCell colSpan={5} align="center">No data available</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
