/* eslint-disable no-param-reassign */
/* eslint-disable no-self-assign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  info: [],
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    initData: (state, action) => {
      console.log(action.payload, 'reducer');
      state.info = action.payload;
    },
    sortProjects: (state, action) => {
      if (action.payload !== 'All') {
        state.info = state.info.filter((el) => el.name === action.payload);
      } else {
        state.info = [...state.info];
      }
    },
  },
  extraReducers: () => {
  },
});

export const { initData } = dataSlice.actions;
export const { sortProjects } = dataSlice.actions;

export default dataSlice.reducer;
