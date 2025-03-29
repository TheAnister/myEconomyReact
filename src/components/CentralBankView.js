import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CentralBankView = () => {
  const history = useSelector(state => state.simulator.centralBank.history);
  const data = history.map(item => ({ month: item.month, rate: item.rate }));

  return (
    <Box>
      <Typography variant="h5" align="center" gutterBottom>Central Bank Interest Rate History</Typography>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis domain={['auto', 'auto']} />
          <Tooltip />
          <Line type="monotone" dataKey="rate" stroke="#ff7300" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default CentralBankView;
