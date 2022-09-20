import { configureStore } from '@reduxjs/toolkit';
import dataSlice from './dataThunk/reducer';

const store = configureStore(
  {
    reducer: {
      dataSlice,
    },
  },
);

export default store;
