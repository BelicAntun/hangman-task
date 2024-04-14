/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Quote, fetchRandomQuote } from '../services/quotes';

const initialState = {
  data: {} as Quote,
  status: 'idle',
};

export const getQuote = createAsyncThunk('quotes/get', async () => {
  const data = await fetchRandomQuote();
  return data;
});

const quoteSlice = createSlice({
  name: 'quotes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getQuote.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getQuote.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(getQuote.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default quoteSlice.reducer;
