import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useSelector, useDispatch } from 'react-redux';
import { initData, sortProjects } from '../store/dataThunk/reducer';
import data from '../data';

function MyTable() {
  const [sort, setSort] = useState('All');
  const info = useSelector((state) => state.dataSlice.info);
  console.log(info, 'comp');

  const dispatch = useDispatch();

  const onSort = (event) => {
    if (event.target.value === 'All') {
      dispatch(initData(data));
    } else {
      const project = event.target.value;
      dispatch(sortProjects(project));
      setSort(project);
    }
  };

  return (
    <TableContainer style={{ width: 900, margin: '100px auto' }} component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ width: 100 }} align="left">
              <FormControl variant="standard" sx={{ m: 1, width: 40 }}>
                <InputLabel id="demo-simple-select-standard-label">All</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  label="All"
                  value={sort}
                  onChange={onSort}
                >
                  <MenuItem value="All">
                    <em>All</em>
                  </MenuItem>
                  {data.map((el) => <MenuItem key={el.id} value={el.name}>{el.name}</MenuItem>)}

                </Select>
              </FormControl>
              Project

            </TableCell>
            <TableCell style={{ width: 100, whiteSpace: 'nowrap' }} align="left">Token type</TableCell>
            <TableCell style={{ width: 100, whiteSpace: 'nowrap' }} align="left">Conditions</TableCell>
            <TableCell style={{ width: 100, whiteSpace: 'nowrap' }} align="left">Volume</TableCell>
            <TableCell style={{ width: 100, whiteSpace: 'nowrap' }} align="left">ROI</TableCell>
            <TableCell style={{ width: 100, whiteSpace: 'nowrap' }} align="left">Free float</TableCell>
            <TableCell style={{ width: 100, whiteSpace: 'nowrap' }} align="left">Insuarance hedge</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {info !== undefined && info.map((row) => (
            <TableRow key={row.id}>
              <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>{row.name}</TableCell>
              <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>{row.type}</TableCell>
              <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>{row.conditions}</TableCell>
              <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>
                $
                {' '}
                {row.volume}
              </TableCell>
              <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>
                {row.roi}
                {' '}
                %
              </TableCell>
              <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>
                {row.free}
                {' '}
                %
              </TableCell>
              <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>
                {row.hedge}
                {' '}
                %
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default MyTable;
