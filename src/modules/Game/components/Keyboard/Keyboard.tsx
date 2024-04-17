import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { KEYS } from './consts';

interface KeyboardPropType {
  guessedLetters: string[];
  lettersFromQuote: string[];
  onClick: (letter: string) => void;
  disabled: boolean;
}

export const Keyboard = ({ guessedLetters, lettersFromQuote, onClick, disabled }: KeyboardPropType) => {
  const isGuesed = (letter: string) => guessedLetters.includes(letter);
  const isQuoteLetter = (letter: string) => lettersFromQuote.includes(letter);

  const keyboard = KEYS.map((key) => (
    <button
      key={key}
      className={twMerge(
        clsx(
          'bg-white h-12 w-12 rounded-md uppercase hover:bg-blue-100 border-2 border-black font-bold',
          'disabled:pointer-events-none',
          {
            ' bg-gray-200 hover:bg-gray-200': isGuesed(key) && !isQuoteLetter(key),
            'text-green-600 bg-green-50 hover:bg-green-50': isGuesed(key) && isQuoteLetter(key),
          },
        ),
      )}
      type="button"
      disabled={isGuesed(key) || disabled}
      onClick={() => onClick(key)}
    >
      {key}
    </button>
  ));
  return <div className="flex flex-wrap justify-center gap-2 max-w-[360px] md:max-w-[560px]">{keyboard}</div>;
};
