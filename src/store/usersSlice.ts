import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index';
import IUser from '../interfaces/user';
import IMessage from '../interfaces/message';
import { IOptions } from '../interfaces/options';

type InitialStateType = {
  users: IUser[];
  user: null | IUser;
  messages: IMessage[];
  options: IOptions;
};

const initialState: InitialStateType = {
  users: [
    // todo delete -->
    {
      isObserver: true,
      room: 'df',
      firstName: 'ds',
      image: 'dsd',
      isMaster: false,
      job: 'jun',
      lastName: 'sd',
      userId: '15',
    },
    {
      isObserver: true,
      room: 'df',
      firstName: 'sKKds',
      image: 'dAssd',
      isMaster: false,
      job: 'Led',
      lastName: 'sd',
      userId: '15',
    },
    // <--delete
  ],
  user: null,
  messages: [],
  options: {
    timerValue: '02:20',
    playable: true,
    swap: true,
    timer: true,
    scoreType: 'story point',
    scoreTypeShort: 'SP',
  },
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
    addOptions: (state, action: PayloadAction<IOptions>) => {
      state.options = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const {
  addUsers,
  addUser,
  setUser,
  addMessages,
  addMessage,
  addOptions,
} = usersSlice.actions;

export const selectUsers = (state: RootState): IUser[] => state.users.users;
export const selectMessages = (state: RootState): IMessage[] =>
  state.users.messages;
export const selectUser = (state: RootState): null | IUser => state.users.user;
export const selectOptions = (state: RootState): IOptions =>
  state.users.options;

export default usersSlice.reducer;
