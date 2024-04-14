/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { StatusType } from 'utils/types';
import { Quote, fetchRandomQuote } from '../services/quotes';

interface Quotes {
  data: Quote;
  status: StatusType;
}

export interface QuoteState {
  quotes: Quotes;
}

const initialState: Quotes = {
  data: {
    id: '',
    content: '',
    author: '',
    tags: [],
    authorSlug: '',
    length: 0,
    dateAdded: null,
    dateModified: null,
  },
  status: StatusType.IDLE,
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
        state.status = StatusType.LOADING;
      })
      .addCase(getQuote.fulfilled, (state, action) => {
        state.status = StatusType.SUCCESS;
        state.data = action.payload;
      })
      .addCase(getQuote.rejected, (state) => {
        state.status = StatusType.ERROR;
      });
  },
});

export default quoteSlice.reducer;
