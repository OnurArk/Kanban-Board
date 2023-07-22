import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: { user: { ui: '', username: '' } },
  reducers: {
    findUI(state, action) {
      const allUsers = action.payload;

      const currentUser = localStorage.getItem('username');

      const user = allUsers.filter((user) => user[1] === currentUser);

      state.user.ui = user[0][0];
      state.user.username = user[0][1];
    },
  },
});

export const userAction = userSlice.actions;

export default userSlice;
