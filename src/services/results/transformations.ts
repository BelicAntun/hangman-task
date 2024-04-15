import { GameResultsResonse } from './types';

export const resToGameResults = (res: any): GameResultsResonse => {
  return {
    id: res.id ?? '',
    quoteId: res.quoteId ?? '',
    length: res.length ?? 0,
    uniqueCharacters: res.uniqueCharacters ?? 0,
    userName: res.userName ?? '',
    errors: res.errors ?? 0,
    duration: res.duration ?? 0,
  };
};
