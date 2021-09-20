import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from './index';
import IUser from '../interfaces/user';
import IMessage from '../interfaces/message';

type InitialStateType = {
  users: IUser[];
  user: null | IUser;
  messages: IMessage[];
};

const initialState: InitialStateType = {
  users: [],
  user: null,
  messages: [],
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
    addMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action: PayloadAction<IMessage>) => {
      state.messages.push(action.payload);
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { addUsers, addUser, setUser, addMessages, addMessage } =
  usersSlice.actions;

export const selectUsers = (state: RootState): IUser[] => state.users.users;
export const selectMessages = (state: RootState): IMessage[] =>
  state.users.messages;
export const selectUser = (state: RootState): null | IUser => state.users.user;

export default usersSlice.reducer;
