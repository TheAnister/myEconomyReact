import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { simulateNextMonth } from '../store/simulatorSlice';
import { Button, Typography, Box } from '@mui/material';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const macroStats = useSelector((state) => state.simulator.macroStats);
  const government = useSelector((state) => state.simulator.government);
  const centralBank = useSelector((state) => state.simulator.centralBank);

  const handleSimulate = () => {
    dispatch(simulateNextMonth());
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>Key Economic Indicators</Typography>
      <Typography variant="body1">
        GDP: £{(macroStats.GDP/1e6).toFixed(2)}mln<br />
        GDP per Capita: £{macroStats["GDP per Capita"].toFixed(2)}<br />
        Population: {macroStats.Population}<br />
        Debt % GDP: {government.debtPercentage}%<br />
        Deficit % GDP: {government.deficitPercentage}%<br />
        Unemployment Rate: {macroStats["Unemployment Rate (%)"].toFixed(2)}%<br />
        Inflation: {macroStats["Inflation (%)"].toFixed(2)}%<br />
        Interest Rate: {centralBank.interestRate}%
      </Typography>
      <Button variant="contained" color="primary" onClick={handleSimulate} sx={{ marginTop: 2 }}>
        Simulate Next Month
      </Button>
    </Box>
  );
};

export default HomeScreen;
