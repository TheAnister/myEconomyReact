import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableHead, TableRow, TablePagination, Paper } from '@mui/material';

const PeopleView = () => {
  const people = useSelector(state => state.simulator.people);
  const [page, setPage] = useState(0);
  const rowsPerPage = 100;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const displayed = people.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Education</TableCell>
            <TableCell>Job</TableCell>
            <TableCell>Income</TableCell>
            <TableCell>Net Worth</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {displayed.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{p.id}</TableCell>
              <TableCell>{p.age.toFixed(1)}</TableCell>
              <TableCell>{p.education_level}</TableCell>
              <TableCell>{p.job}</TableCell>
              <TableCell>£{p.income.toFixed(2)}</TableCell>
              <TableCell>£{p.net_worth.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={people.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[rowsPerPage]}
      />
    </Paper>
  );
};

export default PeopleView;
