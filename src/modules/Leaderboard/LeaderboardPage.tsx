import { ThunkDispatch, UnknownAction } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GameResultsWithScore } from 'services/results';
import { reset } from 'store/gameSlice';
import { ResultState, getResult } from 'store/resultsSlice';
import { twMerge } from 'tailwind-merge';

export const LeaderboardPage = () => {
  const navigate = useNavigate();
  const dispatchGame = useDispatch();
  const dispatch: ThunkDispatch<ResultState, void, UnknownAction> = useDispatch();

  const { data: results, status } = useSelector((state: ResultState) => state.results);

  const resultsPreview = results
    .map((item) => ({ ...item, score: Math.round(100 / (item.errors + 1)) }))
    .sort((a, b) => b.score - a.score)
    .map((result: GameResultsWithScore) => (
      <div key={result.id} className="flex justify-between w-full">
        <span>{result.userName}</span>
        <span>{result.score}</span>
      </div>
    ));

  const onSubmit = () => {
    dispatchGame(reset());
    navigate('/game');
  };

  useEffect(() => {
    dispatch(getResult());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col flex-1 w-full h-screen overflow-auto items-center">
      <h1>Game Page</h1>
      <div>
        <h2>Leaderboard</h2>
        <div className="flex flex-col w-full">{resultsPreview}</div>
      </div>
      <button
        type="button"
        onClick={onSubmit}
        className={twMerge(
          'bg-black text-center font-semibold py-1 px-3 w-full rounded-md text-white shadow-sm',
          'hover:bg-red-900 border-gray-300 border uppercase',
        )}
      >
        Restart
      </button>
    </div>
  );
};
