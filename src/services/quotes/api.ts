import { apiQoute } from 'services/api';
import { Quote } from './types';
import { resToQuote } from './transformations';

export const fetchRandomQuote = async (): Promise<Quote> => {
  const resp = await apiQoute.get(`/random`);
  return resToQuote(resp.data);
};
