import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableHead, TableRow, TablePagination, Paper, TableSortLabel } from '@mui/material';

const PeopleView = () => {
  const people = useSelector(state => state.simulator.people);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedPeople = [...people].sort((a, b) => {
    if (a[orderBy] < b[orderBy]) return order === 'asc' ? -1 : 1;
    if (a[orderBy] > b[orderBy]) return order === 'asc' ? 1 : -1;
    return 0;
  });

  const displayed = sortedPeople.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'id'}
                direction={orderBy === 'id' ? order : 'asc'}
                onClick={() => handleRequestSort('id')}
              >
                ID
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'age'}
                direction={orderBy === 'age' ? order : 'asc'}
                onClick={() => handleRequestSort('age')}
              >
                Age
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'education_level'}
                direction={orderBy === 'education_level' ? order : 'asc'}
                onClick={() => handleRequestSort('education_level')}
              >
                Education
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'job'}
                direction={orderBy === 'job' ? order : 'asc'}
                onClick={() => handleRequestSort('job')}
              >
                Job
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'income'}
                direction={orderBy === 'income' ? order : 'asc'}
                onClick={() => handleRequestSort('income')}
              >
                Income
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === 'net_worth'}
                direction={orderBy === 'net_worth' ? order : 'asc'}
                onClick={() => handleRequestSort('net_worth')}
              >
                Net Worth
              </TableSortLabel>
            </TableCell>
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
        onRowsPerPageChange={(event) => setRowsPerPage(parseInt(event.target.value, 10))}
        rowsPerPageOptions={[25, 50, 100]}
      />
    </Paper>
  );
};

export default PeopleView;