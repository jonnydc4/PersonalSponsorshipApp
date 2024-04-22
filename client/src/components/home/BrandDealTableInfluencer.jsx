import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

function createData(campaignName, company, inquiryDate, status, action) {
  return { campaignName, company, inquiryDate, status, action };
}

const rows = [
  // Need to modify later to fetch data from API so that it is dynamic
  createData('Summer Essentials', 'H&M', '2024-04-01', 'Pending', 'Details'),
  createData('Tech Gadgets Review', 'Best Buy', '2024-03-28', 'In Discussion', 'Details'),
  createData('Fitness Gear Launch', 'Nike', '2024-03-20', 'Confirmed', 'Details'),
  createData('Cooking with Spices', 'McCormick', '2024-04-15', 'Rejected', 'Details'),
  createData('Outdoor Adventure', 'Patagonia', '2024-04-10', 'Pending', 'Details'),
];

export default function BrandDealTableInfluencer() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="brand deal table">
        <TableHead>
          <TableRow>
            <TableCell>Campaign Name</TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Inquiry Date</TableCell>
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
              <TableCell>{row.company}</TableCell>
              <TableCell>{row.inquiryDate}</TableCell>
              <TableCell>{row.status}</TableCell>
              <TableCell>
                {/* Need to add link to view detail page (possibly open chat between company or job offers listing) */}
                <Button variant="contained" color="primary" onClick={() => alert('Open detail view')}>
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
