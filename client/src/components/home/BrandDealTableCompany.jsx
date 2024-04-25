import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

function createData(_id, title, description, location) {
  // This function is used to create a row object for the table
  return { _id, title, description, location };
}

const fetchData = async () => {
  // This is used to fetch all the jobs for a company, and display them on the dashboard 
  const companyId = localStorage.getItem('companyId');

  try {
    const response = await fetch(`/api/jobs/${companyId}`);
    const data = await response.json();

    // Map the response data to match the format expected by the table
    return data.map(job => createData(
      job._id,
      job.title,
      job.description,
      job.location
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
    <TableContainer component={Paper} sx={{ marginLeft: 2, borderRadius: '16px', minWidth: 650, maxWidth: 1464 }}>
      <Table sx={{ minWidth: 650, maxWidth: 1464 }} aria-label="company campaign table">
        <TableHead>
          <TableRow>
            <TableCell>Job Title</TableCell>
            <TableCell>Job Description</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Action </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length > 0 ? rows.map((row) => (
            <TableRow key={row._id}>
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.location}</TableCell>
              {/* <TableCell>{row.status}</TableCell> */}
              <TableCell>
                <Button variant="contained" color="primary" onClick={() => alert('Open applicant view')}>
                  Send Offer
                </Button>
              </TableCell>
            </TableRow>
          )) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                {/* <Button variant="contained" color="primary" onClick={() => alert('Open Job Offer Page?')} sx={{ mt: 2 }}>
                  Post A New Job
                </Button> */}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
