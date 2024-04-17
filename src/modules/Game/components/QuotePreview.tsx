/* eslint-disable react/no-array-index-key */
import clsx from 'clsx';
import { Loader } from 'components/Loader';
import { Quote } from 'services/quotes';
import { twMerge } from 'tailwind-merge';
import { StatusType } from 'utils/types';

interface QuotePreviewPropType {
  guessedLetters: string[];
  quote: Quote;
  status: StatusType;
}

export const QuotePreview = ({ guessedLetters, quote, status }: QuotePreviewPropType) => {
  const renderLetter = (letter: string, isLetter: RegExp) => {
    if (isLetter.test(letter)) {
      if (guessedLetters.includes(letter)) {
        return <span>{letter}</span>;
      }
      return null;
    }
    return <span>{letter}</span>;
  };

  const showQuote = (quoteContent: string) => {
    if (!quoteContent) return null;

    const isLetter = /^[a-zA-Z]$/;

    const words = quoteContent.toLowerCase().split(/\s+/);

    return words.map((word, wordIdx) => (
      <div key={`word_${wordIdx}_${word}`} className="flex mx-4">
        {word.split('').map((letter, letterIdx) => (
          <div
            className={twMerge(
              clsx('ml-1 w-5 h-7 border-b border-black flex justify-center items-center relative', {
                'border-none': !isLetter.test(letter),
              }),
            )}
            key={`${letter}_${letterIdx}`}
          >
            {renderLetter(letter, isLetter)}
          </div>
        ))}
      </div>
    ));
  };

  if (status === StatusType.LOADING) {
    return <Loader />;
  }

  if (status === StatusType.ERROR) {
    return (
      <div className="flex max-w-[360px] md:max-w-[560px] px-10 gap-1 text-red-600">
        Sorry, something went wrong. Please press &quot;RESET&quot; button.
      </div>
    );
  }

  return <div className="uppercase flex flex-wrap w-fit container px-10 gap-1">{showQuote(quote.content)}</div>;
};
