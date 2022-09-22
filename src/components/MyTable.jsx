/* eslint-disable no-nested-ternary */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
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
import { Button } from '@mui/material';
import { initData, sortProjects, sortTokens } from '../store/dataThunk/reducer';
import data from '../data';
import './MyTable.css';

function MyTable() {
  const [sort, setSort] = useState('All');
  const [sortToken, setSortToken] = useState('All');
  let info = useSelector((state) => state.dataSlice.info);

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

  const onSortToken = (event) => {
    if (event.target.value === 'All') {
      dispatch(initData(data));
    } else {
      const project = event.target.value;
      dispatch(sortTokens(project));
      setSortToken(project);
    }
  };

  const sortASC = () => {
    console.log('click');
    const green = 3;
    const yellow = 2;
    const red = 1;
    const check = (info.filter((el) => typeof el.status !== 'number')).length > 0;
    if (check) {
      info = info.map((el) => (el.status === 'green' ? { ...el, status: green } : (el.status === 'yellow' ? { ...el, status: yellow } : { ...el, status: red }))).sort((a, b) => b.status - a.status);
      dispatch(initData(info));
    } else {
      console.log(info)
      // info = info.sort((a, b) => b.status - a.status);
      dispatch(initData(info));
    }
  };

  const sortDESC = () => {
    console.log('click');
    const green = 3;
    const yellow = 2;
    const red = 1;
    info = info.map((el) => (el.status === 'green' ? { ...el, status: green } : (el.status === 'yellow' ? { ...el, status: yellow } : { ...el, status: red }))).sort((a, b) => a.status - b.status);
    dispatch(initData(info));
  };

  return (
    <TableContainer style={{ width: 900, margin: '100px auto' }} component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ display: 'flex' }} align="left">
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
                  {data !== undefined && data.map((el) => <MenuItem key={el.id} value={el.name}>{el.name}</MenuItem>)}
                </Select>
              </FormControl>
              <p>Project</p>
              <button type="button" className="table__button" onClick={sortASC}>▲</button>
              <button type="button" className="table__button" onClick={sortDESC}>▼</button>
            </TableCell>
            <TableCell style={{ width: 100, whiteSpace: 'nowrap' }} align="left">
              <FormControl variant="standard" sx={{ m: 1, width: 40 }}>
                <InputLabel id="demo-simple-select-standard-label">All</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  label="All"
                  value={sortToken}
                  onChange={onSortToken}
                >
                  <MenuItem value="All">
                    <em>All</em>
                  </MenuItem>
                  {data !== undefined && data.map((el) => <MenuItem key={el.id} value={el.type}>{el.type}</MenuItem>)}
                </Select>
              </FormControl>
              Token type
            </TableCell>
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
              <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>
                <div style={{ display: 'flex' }}>
                  {' '}
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '20px',
                    backgroundColor: row.status,
                  }}
                  />
                  {row.name}
                </div>
              </TableCell>
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
              <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>
                <Button>Buy</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default MyTable;
