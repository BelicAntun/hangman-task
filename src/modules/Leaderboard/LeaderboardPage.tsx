import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

export const LeaderboardPage = () => {
  const navigate = useNavigate();

  const onSubmit = () => {
    navigate('/');
  };

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
