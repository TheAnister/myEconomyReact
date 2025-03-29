import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableHead, TableRow, TablePagination, Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const CompaniesView = () => {
  const companies = useSelector(state => state.simulator.companies);
  const [page, setPage] = useState(0);
  const [sortBy, setSortBy] = useState('id');
  const [order, setOrder] = useState('asc');
  const rowsPerPage = 50;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const sortedCompanies = [...companies].sort((a, b) => {
    if (order === 'asc') {
      return a[sortBy] > b[sortBy] ? 1 : -1;
    } else {
      return a[sortBy] < b[sortBy] ? 1 : -1;
    }
  });

  const displayed = sortedCompanies.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <FormControl sx={{ m: 2, minWidth: 120 }}>
        <InputLabel>Sort By</InputLabel>
        <Select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <MenuItem value="id">ID</MenuItem>
          <MenuItem value="revenue">Revenue</MenuItem>
          <MenuItem value="profit">Profit</MenuItem>
          <MenuItem value="employees">Employees</MenuItem>
          <MenuItem value="marketCap">Market Cap</MenuItem>
          <MenuItem value="product_price">Price</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ m: 2, minWidth: 120 }}>
        <InputLabel>Order</InputLabel>
        <Select value={order} onChange={e => setOrder(e.target.value)}>
          <MenuItem value="asc">Ascending</MenuItem>
          <MenuItem value="desc">Descending</MenuItem>
        </Select>
      </FormControl>
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Sector</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Revenue</TableCell>
            <TableCell>Profit</TableCell>
            <TableCell>Employees</TableCell>
            <TableCell>Market Cap</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {displayed.map((c) => (
            <TableRow key={c.id}>
              <TableCell>{c.id}</TableCell>
              <TableCell>{c.name}</TableCell>
              <TableCell>{c.sector}</TableCell>
              <TableCell>{c.company_type}</TableCell>
              <TableCell>£{c.product_price.toFixed(2)}</TableCell>
              <TableCell>£{c.revenue.toFixed(2)}</TableCell>
              <TableCell>£{c.profit.toFixed(2)}</TableCell>
              <TableCell>{c.employees}</TableCell>
              <TableCell>£{c.marketCap.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={companies.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[rowsPerPage]}
      />
    </Paper>
  );
};

export default CompaniesView;
