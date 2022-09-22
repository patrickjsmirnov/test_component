/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  info: [],
  data: [
    {
      id: 1, name: 'Pyshky.net', status: 'green', type: 'TRST', conditions: 'x2,6 months', volume: 120000, roi: 4, free: 20, hedge: 20,
    },
    {
      id: 2, name: 'NFT-Flowershop', status: 'yellow', type: 'THT', conditions: 'x4,2 years', volume: 80000, roi: 23, free: 12, hedge: 0,
    },
    {
      id: 4, name: 'Web3 P2P University', status: 'red', type: 'TRST', conditions: 'x2,1 years', volume: 200000, roi: 6, free: 1, hedge: 0,
    },
  ],
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    initData: (state, action) => {
      state.info = action.payload;
    },
    sortProjects: (state, action) => {
      if (action.payload !== 'All') {
        state.info = state.data.filter((el) => el.name === action.payload);
      } else {
        state.info = [...state.data];
      }
    },
    sortTokens: (state, action) => {
      if (action.payload !== 'All') {
        state.info = state.data.filter((el) => el.type === action.payload);
      } else {
        state.info = [...state.data];
      }
    },
  },
  extraReducers: () => {
  },
});

export const { initData } = dataSlice.actions;
export const { sortProjects } = dataSlice.actions;
export const { sortTokens } = dataSlice.actions;

export default dataSlice.reducer;
