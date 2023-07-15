import { configureStore } from '@reduxjs/toolkit';

import tasksSlice from './task-slice';

const store = configureStore({
  reducer: {
    tasks: tasksSlice.reducer,
  },
});

export default store;
