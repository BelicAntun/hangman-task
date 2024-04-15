export interface GameResults {
  quoteId: string;
  length: number;
  uniqueCharacters: number;
  userName: string;
  errors: number;
  duration: number;
}

export interface GameResultsResonse extends GameResults {
  id: string;
}

export interface GameResultsWithScore extends GameResultsResonse {
  score: number;
}
