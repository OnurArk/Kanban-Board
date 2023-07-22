import { configureStore } from '@reduxjs/toolkit';

import tasksSlice from './slices/task-slice';
import userSlice from './slices/user-slice';

const store = configureStore({
  reducer: {
    tasks: tasksSlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;
