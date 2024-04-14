/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

interface User {
  username: string;
}

export interface UserState {
  user: User;
}

const initialState: User = {
  username: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    add: (state, action) => {
      state.username = action.payload;
    },
  },
});

export const { add } = userSlice.actions;

export default userSlice.reducer;
