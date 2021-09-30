import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Card from 'src/interfaces/card';
import { RootState } from './index';
import User from '../interfaces/user';
import Message from '../interfaces/message';
import { Options } from '../interfaces/options';
import Issue from '../interfaces/issue';

type InitialStateType = {
  titleSpring: string;
  users: User[];
  userId: null | string;
  messages: Message[];
  options: Options;
  issues: Issue[];
  cards: Card[];
};

const initialState: InitialStateType = {
  titleSpring: 'Spring 23 planning...',
  users: [],
  userId: null,
  messages: [],
  options: {
    timerValue: '02:20',
    playable: true,
    swap: true,
    timer: true,
    scoreType: 'story point',
    scoreTypeShort: 'SP',
  },
  issues: [],
  cards: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // USERS
    addUsers: (state, action) => {
      state.users = action.payload;
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    setUser: (state, action) => {
      state.userId = action.payload.userId;
    },

    // MESSAGES
    addMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    addOptions: (state, action: PayloadAction<Options>) => {
      state.options = action.payload;
    },

    // ISSUES
    addIssues: (state, action) => {
      state.issues = action.payload;
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

    // CARDS
    addCards: (state, action) => {
      state.cards = action.payload;
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

    // TITLE
    editTitleSpring: (state, action: PayloadAction<string>) => {
      state.titleSpring = action.payload;
    },

    // GAME
    startGameUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload.map((item) => {
        item.status = 'game';
        return item;
      });
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const userIndex = state.users.findIndex(
        (item) => item.userId === action.payload.userId,
      );
      state.users[userIndex].kickVotes = action.payload.kickVotes;
      if (state.users[userIndex].kickVotes === state.users.length - 1) {
        state.users.splice(userIndex, 1);
      }
    },

    kickPlayerById: (state, action: PayloadAction<string>) => {
      const userIndex = state.users.findIndex(
        (item) => item.userId === action.payload,
      );
      if (userIndex !== -1) {
        state.users[userIndex].kickVotes += 1;
      }
      if (state.users[userIndex].kickVotes === state.users.length - 1) {
        state.users.splice(userIndex, 1);
      }
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
  addIssues,
  editIssue,
  updateUser,
  kickPlayerById,
  addCard,
  deleteCard,
  addCards,
  editCard,
  editTitleSpring,
  startGameUsers,
} = usersSlice.actions;

export const selectUsers = (state: RootState): User[] => state.users.users;
export const selectMessages = (state: RootState): Message[] =>
  state.users.messages;
export const selectUser = (state: RootState): undefined | User =>
  state.users.users.find((item) => item.userId === state.users.userId);
export const selectOptions = (state: RootState): Options => state.users.options;
export const selectIssues = (state: RootState): Issue[] => state.users.issues;
export const selectCards = (state: RootState): Card[] => state.users.cards;
export const selectTitle = (state: RootState): string =>
  state.users.titleSpring;

export default usersSlice.reducer;
