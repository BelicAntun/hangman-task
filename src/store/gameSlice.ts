/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

interface Game {
  guesedLetters: string[];
  uniqueLetters: string[];
  numberOfUniqueLetters: number;
  lengthOfQuote: number;
  mistakes: number;
  createdAt: number;
  finishedAt: number;
}

export interface GameState {
  game: Game;
}

const initialState: Game = {
  guesedLetters: [],
  uniqueLetters: [],
  numberOfUniqueLetters: 0,
  lengthOfQuote: 0,
  mistakes: 0,
  createdAt: 0,
  finishedAt: 0,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    addGuess: (state, action) => {
      state.guesedLetters.push(action.payload);
    },
    addError: (state) => {
      state.mistakes += 1;
    },
    settingGame: (state, action) => {
      state.uniqueLetters = action.payload.uniqueLetters;
      state.numberOfUniqueLetters = action.payload.uniqueLetters.length;
      state.lengthOfQuote = action.payload.lengthOfQuote;
      state.createdAt = Date.now();
    },
    removeFromUniqueLetters: (state, action) => {
      state.uniqueLetters = state.uniqueLetters.filter((letter) => letter !== action.payload);
    },
    reset: () => initialState,
  },
});

export const { addGuess, addError, settingGame, removeFromUniqueLetters, reset } = gameSlice.actions;

export default gameSlice.reducer;
