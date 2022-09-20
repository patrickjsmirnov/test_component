import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import data from '../data';
import { initData } from '../store/dataThunk/reducer';
import MyTable from './MyTable';

function App() {
  const dispatch = useDispatch();
  useEffect(() => dispatch(initData(data)));
  return (
    <MyTable />
  );
}

export default App;
