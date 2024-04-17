import { GameResultsResponse } from 'services/results';

export const calculateScore = (item: GameResultsResponse): number => {
  const { length: lengthOfQuote, uniqueCharacters: uniqueLetters, errors: mistakes, duration: time } = item;
  return Math.round((100 / mistakes) * 1000 + (uniqueLetters / lengthOfQuote) * 1000 - time / 1000);
};
