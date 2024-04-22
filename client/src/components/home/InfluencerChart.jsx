import * as React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample data
const data = [
  { month: 'Jan', engagement: 4000 },
  { month: 'Feb', engagement: 3000 },
  { month: 'Mar', engagement: 5000 },
  { month: 'Apr', engagement: 4800 },
  { month: 'May', engagement: 5600 },
  { month: 'Jun', engagement: 6400 },
  { month: 'Jul', engagement: 7200 }
];

// BROKEN UNTIL FURTHER NOTICE - MORGAN 4/21/2024
function InfluencerChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="engagement" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default InfluencerChart;
