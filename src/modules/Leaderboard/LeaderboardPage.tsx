import { twMerge } from 'tailwind-merge';
import { useLeaderboardPage } from './hooks';
import { LeaderboardTable } from './components/LeaderboardTable';

export const LeaderboardPage = () => {
  const { results, onSubmit, resultsStatus, username } = useLeaderboardPage();

  return (
    <div className="flex flex-col flex-1 w-full h-screen overflow-auto items-center px-4 py-6 sm:p-10 gap-10 bg-gray-50">
      <div className="flex flex-col gap-4 w-full sm:max-w-[600px] min-w-60 shadow-lg p-4 rounded-md bg-white">
        <h1 className="font-bold text-xl">Leaderboard</h1>
        <LeaderboardTable data={results} status={resultsStatus} currentUser={username} />
      </div>
      <button
        type="button"
        onClick={onSubmit}
        className={twMerge(
          'bg-black text-center font-semibold py-1 px-3 w-full sm:max-w-[420px] rounded-md text-white shadow-sm',
          'hover:bg-red-900 border-gray-300 border uppercase h-[38px]',
        )}
      >
        Try again
      </button>
    </div>
  );
};
