import { configureStore } from '@reduxjs/toolkit';
import quoteSlice from './quoteSlice';
import userSlice from './userSlice';
import gameSlice from './gameSlice';
import resultsSlice from './resultsSlice';

const store = configureStore({
  reducer: {
    quotes: quoteSlice,
    user: userSlice,
    game: gameSlice,
    results: resultsSlice,
  },
});

export default store;
