import { apiResults } from 'services/api';
import { GameResults, GameResultsResonse } from './types';
import { resToGameResults } from './transformations';

export const postGameResults = async (data: GameResults): Promise<GameResults> => {
  const resp = await apiResults.post('/highscores', data);
  return resToGameResults(resp.data);
};

export const fetchGameResults = async (): Promise<GameResultsResonse[]> => {
  const resp = await apiResults.get('/highscores');
  return resp.data.map(resToGameResults);
};
