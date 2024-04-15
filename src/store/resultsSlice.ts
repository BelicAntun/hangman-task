/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GameResultsResonse, fetchGameResults } from 'services/results';
import { StatusType } from 'utils/types';

interface Result {
  data: GameResultsResonse[];
  status: StatusType;
}

export interface ResultState {
  results: Result;
}

const initialState: Result = {
  data: [],
  status: StatusType.IDLE,
};

export const getResult = createAsyncThunk('results/get', async () => {
  const data = await fetchGameResults();
  return data;
});

const resultSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getResult.pending, (state) => {
        state.status = StatusType.LOADING;
      })
      .addCase(getResult.fulfilled, (state, action) => {
        state.status = StatusType.SUCCESS;
        state.data = action.payload;
      })
      .addCase(getResult.rejected, (state) => {
        state.status = StatusType.ERROR;
      });
  },
});

export default resultSlice.reducer;
