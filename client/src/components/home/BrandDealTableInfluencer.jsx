import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

function createData(jobTitle, companyName, description, inquiryDate) {
  // This function creates a row object for the table
  return { jobTitle, companyName, description, inquiryDate };
}

const fetchData = async () => {
  // This is used to fetch all the jobs for a user, and display them on the dashboard 
  const userId = localStorage.getItem('userId');
  console.log('User ID', userId);
  try {
    const response = await fetch(`/api/jobOffers/${userId}`);
    const data = await response.json();
    console.log('Fetched Jobs', data);
    // Map the response data to match the format expected by the table
    return data.map(job => createData(
      job.title + ' - ' + job.jobDescription, // Combine title and description
      job.company, // Assuming company field holds the company ID or name
      'Application Received', // You could dynamically determine the status
      new Date(job.notificationTime).toLocaleDateString() // Format the date
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
    <TableContainer component={Paper} sx={{ marginLeft: 2, borderRadius: '16px', minWidth: 650, maxWidth: 1464 }}>
      <Table sx={{ minWidth: 650, maxWidth: 1464 }} aria-label="influencer campaign table">
        <TableHead>
          <TableRow>
            <TableCell>Job Title and Description</TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Date Sent</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length > 0 ? rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {row.jobTitle}
              </TableCell>
              <TableCell>{row.companyName}</TableCell>
              <TableCell>{row.inquiryDate}</TableCell>
              <TableCell>{row.description}</TableCell>
            </TableRow>
          )) : (
            <TableRow>
              <TableCell colSpan={4} align="center">
                No job offers found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
