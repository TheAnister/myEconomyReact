import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateGovernmentPolicy } from '../store/simulatorSlice';
import { Box, Typography, Grid, Slider, Button } from '@mui/material';

const GovernmentView = () => {
  const dispatch = useDispatch();
  const government = useSelector(state => state.simulator.government);
  const [corpTax, setCorpTax] = useState(government.corporateTaxRate);
  const [salesTax, setSalesTax] = useState(government.salesTaxRate);
  const [spending, setSpending] = useState(government.spendingPercentages);
  const [incomeBrackets, setIncomeBrackets] = useState(government.incomeBrackets || { low: 10000, medium: 20000 });
  const [taxRates, setTaxRates] = useState(government.taxRates || { low: 10, medium: 20, high: 30 });

  const handleUpdate = () => {
    dispatch(updateGovernmentPolicy({
      corporateTax: corpTax,
      salesTax: salesTax,
      spending,
      incomeBrackets,
      taxRates
    }));
  };

  const handleBracketChange = (event, newValue, name) => {
    setIncomeBrackets(prev => ({ ...prev, [name]: newValue }));
  };

  const handleTaxRateChange = (event, newValue, name) => {
    setTaxRates(prev => ({ ...prev, [name]: newValue }));
  };

  const handleSpendingChange = (event, newValue, name) => {
    setSpending(prev => ({ ...prev, [name]: newValue }));
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>Government Policies</Typography>
      <Grid container spacing={2}>
        {/* Taxing Section */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>Taxing</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography gutterBottom>Corporate Tax Rate (%)</Typography>
          <Slider
            value={corpTax}
            onChange={(e, val) => setCorpTax(val)}
            aria-labelledby="corp-tax-slider"
            valueLabelDisplay="auto"
            step={1}
            min={0}
            max={100}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography gutterBottom>Sales Tax Rate (%)</Typography>
          <Slider
            value={salesTax}
            onChange={(e, val) => setSalesTax(val)}
            aria-labelledby="sales-tax-slider"
            valueLabelDisplay="auto"
            step={1}
            min={0}
            max={100}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography gutterBottom>Low Income Bracket (Max £)</Typography>
          <Slider
            value={incomeBrackets.low}
            onChange={(e, val) => handleBracketChange(e, val, 'low')}
            aria-labelledby="low-income-bracket-slider"
            valueLabelDisplay="auto"
            step={1000}
            min={0}
            max={incomeBrackets.medium}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography gutterBottom>Medium Income Bracket (Max £)</Typography>
          <Slider
            value={incomeBrackets.medium}
            onChange={(e, val) => handleBracketChange(e, val, 'medium')}
            aria-labelledby="medium-income-bracket-slider"
            valueLabelDisplay="auto"
            step={1000}
            min={incomeBrackets.low}
            max={1000000}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography gutterBottom>Low Income Tax Rate (%)</Typography>
          <Slider
            value={taxRates.low}
            onChange={(e, val) => handleTaxRateChange(e, val, 'low')}
            aria-labelledby="low-income-tax-slider"
            valueLabelDisplay="auto"
            step={1}
            min={0}
            max={100}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography gutterBottom>Medium Income Tax Rate (%)</Typography>
          <Slider
            value={taxRates.medium}
            onChange={(e, val) => handleTaxRateChange(e, val, 'medium')}
            aria-labelledby="medium-income-tax-slider"
            valueLabelDisplay="auto"
            step={1}
            min={0}
            max={100}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography gutterBottom>High Income Tax Rate (%)</Typography>
          <Slider
            value={taxRates.high}
            onChange={(e, val) => handleTaxRateChange(e, val, 'high')}
            aria-labelledby="high-income-tax-slider"
            valueLabelDisplay="auto"
            step={1}
            min={0}
            max={100}
          />
        </Grid>

        {/* Spending Section */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>Spending</Typography>
        </Grid>
        {Object.keys(spending).map((cat) => (
          <Grid key={cat} item xs={12} sm={6}>
            <Typography gutterBottom>{`${cat.charAt(0).toUpperCase() + cat.slice(1)} Spending (% of GDP)`}</Typography>
            <Slider
              value={spending[cat]}
              onChange={(e, val) => handleSpendingChange(e, val, cat)}
              aria-labelledby={`${cat}-spending-slider`}
              valueLabelDisplay="auto"
              step={1}
              min={0}
              max={100}
            />
          </Grid>
        ))}
      </Grid>
      <Button variant="contained" color="primary" sx={{ marginTop: 2 }} onClick={handleUpdate}>
        Update Government Policy
      </Button>
    </Box>
  );
};

export default GovernmentView;