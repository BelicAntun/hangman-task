import clsx from 'clsx';
import { Loader } from 'components/Loader';
import { GameResultsResponse, GameResultsWithScore } from 'services/results';
import { twMerge } from 'tailwind-merge';
import { calculateScore } from 'utils/helpers';
import { StatusType } from 'utils/types';

interface LeaderboardTableProps {
  data: GameResultsResponse[];
  status: StatusType;
  currentUser: string;
}

export const LeaderboardTable = ({ data, status, currentUser }: LeaderboardTableProps) => {
  const resultsPreview = data
    .map((item) => ({ ...item, score: Math.round(100 / (item.errors + 1)) }))
    .sort((a, b) => b.score - a.score)
    .map((result: GameResultsWithScore, idx: number) => (
      <div
        key={result.id}
        className={twMerge(clsx('flex justify-between w-full py-2', { 'text-red-600': currentUser === result.userName }))}
      >
        <div className="flex gap-2">
          <span>{idx + 1}.</span>
          <span>{result.userName}</span>
        </div>

        <span>{result.score}</span>
      </div>
    ));

  const smartResultsPreview = data
    .map((item) => ({
      ...item,
      score: calculateScore(item),
    }))
    .sort((a, b) => b.score - a.score)
    .map((result: GameResultsWithScore, idx: number) => (
      <div
        key={result.id}
        className={twMerge(clsx('flex justify-between w-full py-2', { 'text-red-600': currentUser === result.userName }))}
      >
        <div className="flex gap-2">
          <span>{idx + 1}.</span>
          <span>{result.userName}</span>
        </div>

        <span>{result.score}</span>
      </div>
    ));

  if (status === StatusType.LOADING) {
    return <Loader />;
  }

  if (status === StatusType.ERROR) {
    return (
      <div className="flex max-w-[360px] md:max-w-[560px] px-10 gap-1 text-red-600">
        Sorry, something went wrong. Please press &quot;TRY AGAIN&quot; button.
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 md:gap-16 w-full">
      <div className="flex flex-col gap-4 flex-1">
        <h2 className="font-semibold text-lg">Smart</h2>
        <div className="flex flex-col w-full divide-y">{smartResultsPreview}</div>
      </div>
      <div className="flex flex-col gap-4 flex-1">
        <h2 className="font-semibold text-lg">Classic</h2>
        <div className="flex flex-col w-full divide-y">{resultsPreview}</div>
      </div>
    </div>
  );
};
