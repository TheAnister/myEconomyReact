import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const StocksView = () => {
  const publicCompanies = useSelector(state => state.simulator.stockMarket.publicCompanies);
  const [selected, setSelected] = useState('');
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    if (selected) {
      const comp = publicCompanies.find(c => c.name === selected);
      if (comp) {
        const data = comp.stock_history.map((price, index) => ({ month: index + 1, price }));
        setStockData(data);
      }
    } else {
      setStockData([]);
    }
  }, [selected, publicCompanies]);

  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel>Select Company</InputLabel>
        <Select
          value={selected}
          label="Select Company"
          onChange={(e) => setSelected(e.target.value)}
        >
          {publicCompanies.map((c) => (
            <MenuItem key={c.id} value={c.name}>{c.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      {selected && (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={stockData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis domain={['auto', 'auto']} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </Box>
  );
};

export default StocksView;
