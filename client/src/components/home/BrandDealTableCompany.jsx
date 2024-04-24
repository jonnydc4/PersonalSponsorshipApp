import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

function createData(jobTitle, jobDescription, location, status, currentlyApplied) {
  // This function is used to create a row object for the table
  return { jobTitle, jobDescription, location, status, currentlyApplied };
}

const fetchData = async () => {
  // This is used to fetch all the jobs for a company, and display them on the dashboard 
  const companyId = localStorage.getItem('companyId'); 
  console.log(companyId);
  try {
    const response = await fetch(`/api/jobs/${companyId}`);
    const data = await response.json();
    // Map the response data to match the format expected by the table
    return data.map(job => createData(
      job.title, // Assuming the job object has a title field
      job.description, // Assuming the job object has a description field
      job.location, // Assuming the job object has a location field
      job.status, // Status of the job
      job.currentlyApplied, // Number of current applicants
      'View Applicants' // Assuming all actions are the same
    ));
  } catch (error) {
    console.error('Error fetching job offers:', error);
    return []; // Return an empty array on error
  }
};

export default function BrandDealTableCompany() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetchData().then(setRows); // Fetch data on component mount and set it to rows
  }, []); // Empty dependency array to run only once on mount

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="company campaign table">
        <TableHead>
          <TableRow>
            <TableCell>Job Title</TableCell>
            <TableCell>Job Description</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Total Applicants </TableCell>
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
                <Button variant="contained" color="primary" onClick={() => alert('Open applicant view')}>
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
