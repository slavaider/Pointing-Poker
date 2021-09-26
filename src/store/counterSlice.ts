import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// eslint-disable-next-line import/no-cycle
import { AppThunk, RootState } from ".";

interface Issue {
  cardTitle: string;
  priority: string;
  linkToIssue: string;
  id: number;
}

const initialState = {
  value: 0,
  status: "idle",
  members: [],
  issues: [
    {
      cardTitle: "Issue 20",
      priority: "Low",
      linkToIssue: "#",
      id: 1,
    },
    {
      cardTitle: "Issue 25",
      priority: "Low",
      linkToIssue: "#",
      id: 2,
    },
    {
      cardTitle: "Issue 30",
      priority: "Low",
      linkToIssue: "#",
      id: 3,
    },
    {
      cardTitle: "Issue 35",
      priority: "Low",
      linkToIssue: "#",
      id: 4,
    },
  ],
  cards: [
    {
      cardValue: 13,
      cardTitle: "SP",
      id: 1,
    },
    {
      cardValue: 15,
      cardTitle: "SP",
      id: 2,
    },
  ],
};

function fetchCount(amount = 1) {
  return new Promise<{
    data: number;
  }>((resolve) => setTimeout(() => resolve({ data: amount }), 500));
}

export const incrementAsync = createAsyncThunk(
  "counter/fetchCount",
  async (amount: number) => {
    const response = await fetchCount(amount);
    return response.data;
  }
);

export const counterSlice = createSlice({
  name: "counter",
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
    addIssue: (state, action: PayloadAction<Issue>) => {
      state.issues.push(action.payload);
    },
    removeIssue: (state, action: PayloadAction<number>) => {
      state.issues.filter((element: { id: number }, index: number) => {
        element.id === action.payload ? state.issues.splice(index, 1) : "";
      });
    },
    editIssue: (state, action) => {
      state.issues.filter((element: { id: number }, index: number) => {
        element.id === action.payload.id
          ? (state.issues[index] = action.payload)
          : "";
      });
    },
    addCard: (state, action) => {
      state.cards.push(action.payload);
    },
    deleteCard: (state, action) => {
      state.cards.filter((element: { id: number }, index: number) => {
        element.id === action.payload ? state.cards.splice(index, 1) : "";
      });
    },
    editCard: (state, action) => {
      state.cards.filter((element: { id: number }, index: number) => {
        element.id === action.payload.id
          ? (state.cards[index].cardValue = action.payload.cardValue)
          : "";
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.value += action.payload;
      });
  },
});

export const {
  increment,
  decrement,
  incrementByAmount,
  addIssue,
  removeIssue,
  editIssue,
  addCard,
  deleteCard,
  editCard,
} = counterSlice.actions;

export const selectCount = (state: RootState): number => state.counter.value;

export const incrementByAmountThunk = (amount: number): AppThunk => async (
  dispatch
) => {
  const response = await fetchCount(amount);
  dispatch(incrementByAmount(response.data));
};

export default counterSlice.reducer;
