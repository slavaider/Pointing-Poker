import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import counterReducer from './counterSlice';
// eslint-disable-next-line import/no-cycle
import usersReducer from './usersSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    settings: counterReducer,
    users: usersReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
