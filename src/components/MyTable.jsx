/* eslint-disable max-len */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable no-nested-ternary */
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
  const [sortCond, setCortCond] = useState(true);
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

  const sortStatus = (event) => {
    const text = event.target.innerHTML;
    const check = (info.filter((el) => typeof el.status !== 'number'));
    if (check.length > 0) {
      info = info.map((el) => (el.status === 'green' ? { ...el, status: 3 } : (el.status === 'yellow' ? { ...el, status: 2 } : { ...el, status: 1 })));
    }

    if (text === '▲') {
      info = [...info].sort((a, b) => b.status - a.status);
    } else {
      info = [...info].sort((a, b) => a.status - b.status);
    }
    dispatch(initData(info));
  };

  const sortVolume = (event) => {
    const text = event.target.innerHTML;
    if (text === '▲') {
      info = [...info].sort((a, b) => b.volume - a.volume);
      dispatch(initData(info));
    } else {
      info = [...info].sort((a, b) => a.volume - b.volume);
      dispatch(initData(info));
    }
  };

  const sortConditions = (event) => {
    const text = event.target.innerHTML;
    info = [...info].map((el) => {
      if (el.conditions.includes('years')) {
        const time = (el.conditions.substring(1, 4));
        return el = { ...el, time: Math.round(+(`${time[0]}.${time[2]}`) * 12) };
      }
      const time = (el.conditions.substring(1, 4));
      return el = { ...el, time: Math.round(+(`${time[0]}.${time[2]}`)) };
    });
    if (text === '▼') {
      info = [...info].sort((a, b) => a.time - b.time);
      dispatch(initData(info));
      setCortCond(!sortCond);
    } else {
      info = [...info].sort((a, b) => b.time - a.time);
      dispatch(initData(info));
      setCortCond(!sortCond);
    }
  };

  return (
    <TableContainer style={{ width: 1000, margin: '100px auto' }} component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ display: 'flex', alignItems: 'center' }} align="left">
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
              <button type="button" className="table__button" onClick={sortStatus}>▲</button>
              <button type="button" className="table__button" onClick={sortStatus}>▼</button>
            </TableCell>
            <TableCell style={{ width: 100, whiteSpace: 'nowrap' }} align="left">
              <div style={{ display: 'flex', alignItems: 'center' }}>
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
                    <MenuItem value="THT">THT</MenuItem>
                    <MenuItem value="TRST">TRST</MenuItem>
                  </Select>
                </FormControl>
                <p>Token type</p>
              </div>
            </TableCell>
            <TableCell style={{ width: 100, whiteSpace: 'nowrap' }} align="left">
              {sortCond ? <button type="button" className="table__button" onClick={sortConditions}>▼</button>
                : <button type="button" className="table__button" onClick={sortConditions}>▲</button> }

              Conditions
            </TableCell>
            <TableCell
              style={{
                width: 100, whiteSpace: 'nowrap', display: 'flex', alignItems: 'center',
              }}
              align="left"
            >
              <p>Volume</p>
              <button type="button" className="table__button" onClick={sortVolume}>▲</button>
              <button type="button" className="table__button" onClick={sortVolume}>▼</button>
            </TableCell>
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
