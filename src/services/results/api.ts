import { apiResults } from 'services/api';
import { resToGameResults } from './transformations';
import { GameResults, GameResultsResponse } from './types';

export const postGameResults = async (data: GameResults): Promise<GameResultsResponse> => {
  const resp = await apiResults.post('/highscores', data);
  return resToGameResults(resp.data);
};

export const fetchGameResults = async (): Promise<GameResultsResponse[]> => {
  const resp = await apiResults.get('/highscores');
  return resp.data.map(resToGameResults);
};
