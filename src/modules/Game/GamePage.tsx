/* eslint-disable react/no-array-index-key */
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { useSelector, useDispatch } from 'react-redux';
import { ThunkDispatch, UnknownAction } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { QuoteState, getQuote } from 'store/quoteSlice';
import { Keyboard } from 'components/Keyboard';
import clsx from 'clsx';
import { UserState } from 'store/userSlice';
import { GameState, addError, addGuess, settingGame, removeFromUniqueLetters, reset } from 'store/gameSlice';
import { StatusType } from 'utils/types';

export const GamePage = () => {
  const navigate = useNavigate();
  const dispatch: ThunkDispatch<QuoteState, void, UnknownAction> = useDispatch();
  const dispatchGame = useDispatch();
  const { data: qoutes, status } = useSelector((state: QuoteState) => state.quotes);
  const { username } = useSelector((state: UserState) => state.user);
  const { mistakes, guesedLetters, uniqueLetters, createdAt } = useSelector((state: GameState) => state.game);

  const onSubmit = () => {
    dispatchGame(reset());
    dispatch(getQuote());
  };

  const uniqueLettersFromQuote = (quoteContent: string) => {
    return quoteContent
      .toLowerCase()
      .split('')
      .filter((letter, idx, self) => self.indexOf(letter) === idx)
      .filter((letter) => /^[a-zA-Z]$/.test(letter));
  };

  const renderLetter = (letter: string, isLetter: RegExp) => {
    if (isLetter.test(letter)) {
      if (guesedLetters.includes(letter)) {
        return <span>{letter}</span>;
      }
      return null;
    }
    return <span>{letter}</span>;
  };

  const quotePreview = (quoteContent: string) => {
    if (!quoteContent) return null;

    const isLetter = /^[a-zA-Z]$/;

    const words = quoteContent.toLowerCase().split(/\s+/);

    return words.map((word, wordIdx) => (
      <div key={`word_${wordIdx}_${word}`} className="flex mx-4">
        {word.split('').map((letter, letterIdx) => (
          <div
            className={twMerge(
              clsx('ml-1 w-3 sm:w-5 sm:h-7 border-b border-black flex justify-center items-center relative', {
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

  const handleClick = (letter: string) => {
    dispatchGame(addGuess(letter));
    if (!qoutes.content.toLowerCase().includes(letter)) {
      dispatchGame(addError());
    }
    dispatchGame(removeFromUniqueLetters(letter));
  };

  const calculateDuration = (start: number) => {
    return start ? Date.now() - start : 0;
  };

  const handleGameEnd = () => {
    if (mistakes >= 6 || (uniqueLetters.length === 0 && guesedLetters.length > 0)) {
      console.log('Game ended', {
        quoteId: qoutes.id,
        length: qoutes.content.length,
        uniqueCharacters: uniqueLetters.length,
        userName: username,
        errors: mistakes,
        duration: calculateDuration(createdAt),
      });
    }
  };

  useEffect(() => {
    dispatch(getQuote());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (status === StatusType.SUCCESS) {
      dispatchGame(settingGame({ uniqueLetters: uniqueLettersFromQuote(qoutes.content), lengthOfQuote: qoutes.content.length }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  useEffect(() => {
    handleGameEnd();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mistakes, uniqueLetters]);

  return (
    <div className="flex flex-col justify-around flex-1 w-full h-screen overflow-auto items-center max-w-[1536px] mx-auto p-3">
      <div className="flex justify-between w-full">
        <p className="uppercase font-semibold text-xl text-left">{`${username}`}</p>

        <p className="uppercase font-semibold text-xl text-left">{`Mistakes: ${mistakes} / 6`}</p>
      </div>
      {status === StatusType.SUCCESS ? (
        <div className="uppercase flex flex-wrap max-w-[360px] md:max-w-[560px] px-10 gap-1">{quotePreview(qoutes.content)}</div>
      ) : (
        <h2>Loading...</h2>
      )}
      <Keyboard guesedLetters={guesedLetters} lettersFromQuote={uniqueLettersFromQuote(qoutes.content)} onClick={handleClick} />
      <button
        type="button"
        onClick={onSubmit}
        className={twMerge(
          'bg-black text-center font-semibold py-1 px-3 w-full rounded-md text-white shadow-sm',
          'hover:bg-red-900 border-gray-300 border uppercase',
        )}
      >
        Reset
      </button>
    </div>
  );
};
