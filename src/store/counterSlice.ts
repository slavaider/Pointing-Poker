import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { AppThunk, RootState } from '.';

const initialState = {
  value: 0,
  status: 'idle',
  members: [],
  issues: [
    {
      cardTitle: 'Issue 20',
      priority: 'Low',
      linkToIssue: '#',
    },
    {
      cardTitle: 'Issue 25',
      priority: 'Low',
      linkToIssue: '#',
    },
    {
      cardTitle: 'Issue 30',
      priority: 'Low',
      linkToIssue: '#',
    },
    {
      cardTitle: 'Issue 35',
      priority: 'Low',
      linkToIssue: '#',
    },
  ],
};

function fetchCount(amount = 1) {
  return new Promise<{ data: number }>((resolve) => setTimeout(() => resolve({ data: amount }), 500));
}

export const incrementAsync = createAsyncThunk('counter/fetchCount', async (amount: number) => {
  const response = await fetchCount(amount);
  return response.data;
});

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value += action.payload;
      });
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export const selectCount = (state: RootState): number => state.counter.value;

export const incrementByAmountThunk = (amount: number): AppThunk => async (dispatch) => {
  const response = await fetchCount(amount);
  dispatch(incrementByAmount(response.data));
};

export default counterSlice.reducer;
