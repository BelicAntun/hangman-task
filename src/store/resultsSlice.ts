/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';
import { GameResultsResonse, fetchGameResults } from 'services/results';
import { StatusType } from 'utils/types';

interface Result {
  data: GameResultsResonse[];
  userData: GameResultsResonse[];
  status: StatusType;
}

export interface ResultState {
  results: Result;
}

const initialState: Result = {
  data: [],
  userData: [],
  status: StatusType.IDLE,
};

export const getResult = createAsyncThunk('results/get', async () => {
  const data = await fetchGameResults();
  return data;
});

const resultSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    resetResults: (state) => {
      state.data = [];
    },
    addResult: (state, action) => {
      state.userData.push({ ...action.payload, id: nanoid() });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getResult.pending, (state) => {
        state.status = StatusType.LOADING;
      })
      .addCase(getResult.fulfilled, (state, action) => {
        state.status = StatusType.SUCCESS;
        state.data = [...state.userData, ...action.payload];
      })
      .addCase(getResult.rejected, (state) => {
        state.status = StatusType.ERROR;
      });
  },
});

export const { resetResults, addResult } = resultSlice.actions;

export default resultSlice.reducer;
