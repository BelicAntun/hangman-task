import { ThunkDispatch, UnknownAction } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GameResultsWithScore } from 'services/results';
import { reset } from 'store/gameSlice';
import { ResultState, getResult, resetResults } from 'store/resultsSlice';
import { twMerge } from 'tailwind-merge';
import { calculateScore } from 'utils/helpers';

export const LeaderboardPage = () => {
  const navigate = useNavigate();
  const dispatchGame = useDispatch();
  const dispatch: ThunkDispatch<ResultState, void, UnknownAction> = useDispatch();

  const { data: results, status } = useSelector((state: ResultState) => state.results);

  const resultsPreview = results
    .map((item) => ({ ...item, score: Math.round(100 / (item.errors + 1)) }))
    .sort((a, b) => b.score - a.score)
    .map((result: GameResultsWithScore, idx: number) => (
      <div key={result.id} className="flex justify-between w-full py-2">
        <div className="flex gap-2">
          <span>{idx + 1}.</span>
          <span>{result.userName}</span>
        </div>

        <span>{result.score}</span>
      </div>
    ));

  const smartResultsPreview = results
    .map((item) => ({
      ...item,
      score: calculateScore({
        lengthOfQuote: item.length,
        uniqueLetters: item.uniqueCharacters,
        mistakes: item.errors,
        time: item.duration,
      }),
    }))
    .sort((a, b) => b.score - a.score)
    .map((result: GameResultsWithScore, idx: number) => (
      <div key={result.id} className="flex justify-between w-full py-2">
        <div className="flex gap-2">
          <span>{idx + 1}.</span>
          <span>{result.userName}</span>
        </div>

        <span>{result.score}</span>
      </div>
    ));

  const onSubmit = () => {
    dispatchGame(reset());
    dispatch(resetResults());
    navigate('/game');
  };

  useEffect(() => {
    dispatch(getResult());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col flex-1 w-full h-screen overflow-auto items-center px-4 py-6 sm:p-10 gap-10 bg-gray-50">
      <div className="flex flex-col gap-4 w-full sm:max-w-[420px] min-w-60 shadow-lg p-4 rounded-md bg-white">
        <h1 className="font-bold text-xl">Leaderboard</h1>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex flex-col w-full divide-y">{smartResultsPreview}</div>
          <div className="flex flex-col w-full divide-y">{resultsPreview}</div>
        </div>
      </div>
      <button
        type="button"
        onClick={onSubmit}
        className={twMerge(
          'bg-black text-center font-semibold py-1 px-3 w-full sm:max-w-[420px] rounded-md text-white shadow-sm',
          'hover:bg-red-900 border-gray-300 border uppercase',
        )}
      >
        Restart
      </button>
    </div>
  );
};
