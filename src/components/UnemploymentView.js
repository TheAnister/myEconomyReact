import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const UnemploymentView = () => {
  const macroHistory = useSelector(state => state.simulator.macroHistory);
  const data = macroHistory["Unemployment Rate (%)"] ? 
    macroHistory["Unemployment Rate (%)"].map((val, index) => ({ month: index + 1, unemployment: val })) : [];

  return (
    <Box>
      <Typography variant="h5" align="center" gutterBottom>Unemployment Rate History</Typography>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="unemployment" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default UnemploymentView;
