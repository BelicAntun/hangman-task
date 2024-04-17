/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';
import { GameResults, GameResultsResponse, fetchGameResults, postGameResults } from 'services/results';
import { StatusType } from 'utils/types';

interface Result {
  data: GameResultsResponse[];
  userData: GameResultsResponse[];
  status: StatusType;
  postStatus: StatusType;
}

export interface ResultState {
  results: Result;
}

const initialState: Result = {
  data: [],
  userData: [],
  status: StatusType.IDLE,
  postStatus: StatusType.IDLE,
};

export const getResult = createAsyncThunk('results/get', async () => {
  const data = await fetchGameResults();
  return data;
});

export const addGameResults = createAsyncThunk('results/post', async (data: GameResults) => {
  const response = await postGameResults(data);
  return response;
});

const resultSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    resetResults: (state) => {
      state.data = [];
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
      })
      .addCase(addGameResults.pending, (state) => {
        state.postStatus = StatusType.LOADING;
      })
      .addCase(addGameResults.fulfilled, (state, action) => {
        state.postStatus = StatusType.SUCCESS;
        state.userData.push({ ...action.payload, id: nanoid() });
      })
      .addCase(addGameResults.rejected, (state) => {
        state.postStatus = StatusType.ERROR;
      });
  },
});

export const { resetResults } = resultSlice.actions;

export default resultSlice.reducer;
