import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from './index';
import IUser from '../interfaces/user';

type InitialStateType = {
  users: IUser[];
  userId: null | string;
};

const initialState: InitialStateType = {
  users: [],
  userId: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUsers: (state, action) => {
      state.users = action.payload;
    },
    addUser: (state, action: PayloadAction<IUser>) => {
      state.users.push(action.payload);
    },
    setUser: (state, action) => {
      state.userId = action.payload;
    },
  },
});

export const { addUsers, addUser, setUser } = usersSlice.actions;

export const selectUsers = (state: RootState): IUser[] => state.users.users;
export const selectUser = (state: RootState): null | string =>
  state.users.userId;

export default usersSlice.reducer;
