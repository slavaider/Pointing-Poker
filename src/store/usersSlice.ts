import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from './index';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
  },
  reducers: {
    addUsers: (state, action) => {
      state.users = action.payload;
    },
    addUser: (state, action) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      state.users.push(action.payload);
    },
  },
});

export const { addUsers, addUser } = usersSlice.actions;

export const selectUsers = (state: RootState): never[] => state.users.users;

export default usersSlice.reducer;
