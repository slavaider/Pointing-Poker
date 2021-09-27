import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Card from 'src/interfaces/card';
import { RootState } from './index';
import User from '../interfaces/user';
import Message from '../interfaces/message';
import { Options } from '../interfaces/options';
import Issue from '../interfaces/issue';

type InitialStateType = {
  users: User[];
  user: null | User;
  messages: Message[];
  options: Options;
  issues: Issue[];
  cards: Card[];
};

const initialState: InitialStateType = {
  users: [],
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
  issues: [
    {
      cardTitle: 'Issue 20',
      priority: 'Low',
      linkToIssue: '#',
      id: '1',
    },
    {
      cardTitle: 'Issue 25',
      priority: 'Low',
      linkToIssue: '#',
      id: '2',
    },
    {
      cardTitle: 'Issue 30',
      priority: 'Low',
      linkToIssue: '#',
      id: '3',
    },
    {
      cardTitle: 'Issue 35',
      priority: 'Low',
      linkToIssue: '#',
      id: '4',
    },
  ],
  cards: [
    {
      cardValue: 13,
      cardTitle: 'SP',
      id: '1',
    },
    {
      cardValue: 15,
      cardTitle: 'SP',
      id: '2',
    },
  ],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUsers: (state, action) => {
      state.users = action.payload;
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    addMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    addOptions: (state, action: PayloadAction<Options>) => {
      state.options = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },

    addIssue: (state, action: PayloadAction<Issue>) => {
      state.issues.push(action.payload);
    },
    removeIssue: (state, action: PayloadAction<string>) => {
      state.issues.forEach((element, index) => {
        if (element.id === action.payload) state.issues.splice(index, 1);
      });
    },
    editIssue: (state, action) => {
      state.issues.forEach((element, index) => {
        if (element.id === action.payload.id) {
          state.issues[index] = action.payload;
        }
      });
    },

    addCard: (state, action) => {
      state.cards.push(action.payload);
    },
    deleteCard: (state, action: PayloadAction<string>) => {
      state.cards.forEach((element, index) => {
        if (element.id === action.payload) state.cards.splice(index, 1);
      });
    },
    editCard: (state, action) => {
      state.cards.forEach((element, index) => {
        if (element.id === action.payload.id)
          state.cards[index].cardValue = action.payload.cardValue;
      });
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
  addIssue,
  removeIssue,
  editIssue,
  addCard,
  deleteCard,
  editCard,
} = usersSlice.actions;

export const selectUsers = (state: RootState): User[] => state.users.users;
export const selectMessages = (state: RootState): Message[] =>
  state.users.messages;
export const selectUser = (state: RootState): null | User => state.users.user;
export const selectOptions = (state: RootState): Options => state.users.options;
export const selectIssues = (state: RootState): Issue[] => state.users.issues;
export const selectCards = (state: RootState): Card[] => state.users.cards;

export default usersSlice.reducer;
