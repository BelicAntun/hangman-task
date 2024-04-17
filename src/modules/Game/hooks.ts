import { ThunkDispatch, UnknownAction } from '@reduxjs/toolkit';
import { Dispatch, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GameState, reset, addGuess, addError, removeFromUniqueLetters, settingGame } from 'store/gameSlice';
import { QuoteState, getQuote } from 'store/quoteSlice';
import { ResultState, addGameResults } from 'store/resultsSlice';
import { UserState } from 'store/userSlice';
import { StatusType } from 'utils/types';

export const useGamePage = () => {
  const navigate = useNavigate();
  const dispatch: ThunkDispatch<QuoteState, void, UnknownAction> = useDispatch();
  const dispatchGame: Dispatch<UnknownAction> = useDispatch();
  const dispatchPost: ThunkDispatch<unknown, unknown, UnknownAction> = useDispatch();
  const { data: quote, status: quoteStatus } = useSelector((state: QuoteState) => state.quotes);
  const { username } = useSelector((state: UserState) => state.user);
  const { mistakes, guessedLetters, uniqueLetters, createdAt } = useSelector((state: GameState) => state.game);
  const { postStatus } = useSelector((state: ResultState) => state.results);

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

  const handleLetterClick = (letter: string) => {
    dispatchGame(addGuess(letter));
    if (!quote.content.toLowerCase().includes(letter)) {
      dispatchGame(addError());
    }
    dispatchGame(removeFromUniqueLetters(letter));
  };

  const calculateDuration = (start: number) => {
    return start ? Date.now() - start : 0;
  };

  const handleGameEnd = async () => {
    if (mistakes < 6 && (uniqueLetters.length !== 0 || guessedLetters.length === 0)) {
      return; // No need to proceed if game conditions are not met
    }

    await dispatchPost(
      addGameResults({
        quoteId: quote.id,
        length: quote.content.length,
        uniqueCharacters: uniqueLetters.length,
        userName: username,
        errors: mistakes,
        duration: calculateDuration(createdAt),
      }),
    );

    navigate('/game/result');
  };

  useEffect(() => {
    if (quoteStatus === StatusType.IDLE) {
      dispatch(getQuote());
    }
  }, [dispatch, quoteStatus]);

  useEffect(() => {
    if (quoteStatus === StatusType.SUCCESS) {
      dispatchGame(settingGame({ uniqueLetters: uniqueLettersFromQuote(quote.content), lengthOfQuote: quote.content.length }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quoteStatus]);

  useEffect(() => {
    handleGameEnd();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mistakes, uniqueLetters.length, guessedLetters.length]);

  return {
    onSubmit,
    handleLetterClick,
    quote,
    guessedLetters,
    username,
    mistakes,
    uniqueLettersFromQuote,
    postStatus,
    quoteStatus,
  };
};
