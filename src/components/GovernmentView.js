import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateGovernmentPolicy } from '../store/simulatorSlice';
import { Box, TextField, Button, Typography, Grid } from '@mui/material';

const GovernmentView = () => {
  const dispatch = useDispatch();
  const government = useSelector(state => state.simulator.government);
  const [corpTax, setCorpTax] = useState(government.corporateTaxRate);
  const [salesTax, setSalesTax] = useState(government.salesTaxRate);
  const [spending, setSpending] = useState(government.spendingPercentages);

  const handleUpdate = () => {
    dispatch(updateGovernmentPolicy({
      corporateTax: corpTax,
      salesTax: salesTax,
      spending
    }));
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>Government Policies</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Corporate Tax Rate (%)"
            type="number"
            fullWidth
            value={corpTax}
            onChange={(e) => setCorpTax(Number(e.target.value))}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Sales Tax Rate (%)"
            type="number"
            fullWidth
            value={salesTax}
            onChange={(e) => setSalesTax(Number(e.target.value))}
          />
        </Grid>
        {Object.keys(spending).map((cat) => (
          <Grid key={cat} item xs={12} sm={6}>
            <TextField
              label={`${cat.charAt(0).toUpperCase() + cat.slice(1)} Spending (% of GDP)`}
              type="number"
              fullWidth
              value={spending[cat]}
              onChange={(e) => setSpending({ ...spending, [cat]: Number(e.target.value) })}
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
