import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

function createData(campaignName, totalApplicants, topApplicants, status, action) {
  return { campaignName, totalApplicants, topApplicants, status, action };
}

const rows = [
  createData('Summer Essentials', 34, 'Alex, Jordan, Casey', 'Reviewing', 'View Applicants'),
  createData('Tech Gadgets Review', 45, 'Sam, Pat, Terry', 'In Discussion', 'View Applicants'),
  createData('Fitness Gear Launch', 29, 'Jamie, Morgan, Lee', 'Active', 'View Applicants'),
  createData('Cooking with Spices', 12, 'Chris, Alexi, Kim', 'Completed', 'View Applicants'),
  createData('Outdoor Adventure', 22, 'Sky, Robin, Max', 'Pending', 'View Applicants'),
];



// const fetchJobOffers = async () => {
//   const companyId = localStorage.getItem('companyId');
  
//   try {
//     const response = await fetch(`/api/jobs/${companyId}`);
//     const data = await response.json();
//     getFIXME(data);
//     const mappedData = data.map(offer => ({
//       ...offer,
//       name: offer.title
//     }));
//     getFIXME(mappedData);
//     return mappedData
//   }
//   catch (error) {
//     console.error('Error fetching job offers:', error);{}
//   }
// }



export default function BrandDealTableCompany() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="company campaign table">
        <TableHead>
          <TableRow>
            <TableCell>Campaign Name</TableCell>
            <TableCell>Total Applicants</TableCell>
            <TableCell>Top Applicants</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
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
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
