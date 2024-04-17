import { Keyboard } from 'modules/Game/components/Keyboard';
import { twMerge } from 'tailwind-merge';
import { StatusType } from 'utils/types';
import { QuotePreview } from './components/QuotePreview';
import { useGamePage } from './hooks';
import { Hangman } from './components/Hangman';

export const GamePage = () => {
  const {
    onSubmit,
    handleLetterClick,
    guessedLetters,
    username,
    mistakes,
    quote,
    uniqueLettersFromQuote,
    postStatus,
    quoteStatus,
  } = useGamePage();

  return (
    <div
      className={twMerge(
        'flex flex-col justify-around flex-1 w-full h-screen overflow-auto items-center',
        'max-w-[1536px] mx-auto px-4 py-6 sm:p-10 gap-10',
      )}
    >
      <div className="flex justify-between w-full">
        <p className="uppercase font-semibold text-xl text-left">{`${username}`}</p>

        <p className="uppercase font-semibold text-xl text-left">{`Mistakes: ${mistakes} / 6`}</p>
      </div>

      <Hangman mistakes={mistakes} />

      <QuotePreview guessedLetters={guessedLetters} quote={quote} status={quoteStatus} />

      <Keyboard
        guessedLetters={guessedLetters}
        lettersFromQuote={uniqueLettersFromQuote(quote.content)}
        onClick={handleLetterClick}
        disabled={postStatus === StatusType.LOADING}
      />
      <button
        type="button"
        onClick={onSubmit}
        className={twMerge(
          'bg-black text-center font-semibold py-1 px-3 w-full sm:max-w-[420px] rounded-md text-white shadow-sm',
          'hover:bg-red-900 border-gray-300 border uppercase h-[38px]',
        )}
      >
        Reset
      </button>
    </div>
  );
};
