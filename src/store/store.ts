import { configureStore } from '@reduxjs/toolkit';
import quoteSlice from './quoteSlice';
import userSlice from './userSlice';

const store = configureStore({
  reducer: {
    quotes: quoteSlice,
    user: userSlice,
  },
});

export default store;
