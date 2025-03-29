import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const StatisticsView = () => {
  const macroHistory = useSelector(state => state.simulator.macroHistory);
  const [metric, setMetric] = useState("GDP");

  const data = macroHistory[metric] ? macroHistory[metric].map((val, index) => ({ month: index + 1, value: val })) : [];

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel>Select Macro Statistic</InputLabel>
        <Select value={metric} label="Select Macro Statistic" onChange={e => setMetric(e.target.value)}>
          {Object.keys(macroHistory).map((m) => (
            <MenuItem key={m} value={m}>{m}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis domain={['auto', 'auto']} />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#82ca9d" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default StatisticsView;