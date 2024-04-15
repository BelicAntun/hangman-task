import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GameResults, fetchGameResults } from 'services/results';
import { reset } from 'store/gameSlice';
import { twMerge } from 'tailwind-merge';

export const LeaderboardPage = () => {
  const navigate = useNavigate();
  const dispatchGame = useDispatch();
  const [results, setResults] = useState<GameResults[] | null>(null);

  const onSubmit = () => {
    dispatchGame(reset());
    navigate('/game');
  };

  const getResult = async () => {
    const res = await fetchGameResults();
    setResults(res);
  };

  console.log(results);

  useEffect(() => {
    getResult();
  }, []);

  return (
    <div className="flex flex-col flex-1 w-full h-screen overflow-auto items-center">
      <h1>Game Page</h1>
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
