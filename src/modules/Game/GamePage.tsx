import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { useSelector, useDispatch } from 'react-redux';
import { ThunkDispatch, UnknownAction } from '@reduxjs/toolkit';
import { Quote } from 'services/quotes';
import { useEffect } from 'react';
import { getQuote } from 'store/quoteSlice';

interface RootState {
  quotes: {
    data: Quote;
    status: string;
  };
}

export const GamePage = () => {
  const navigate = useNavigate();
  const dispatch: ThunkDispatch<RootState, void, UnknownAction> = useDispatch();
  const { data: qoutes, status } = useSelector((state: RootState) => state.quotes);
  const { username } = useSelector((state: { user: { username: string } }) => state.user);

  const onSubmit = () => {
    navigate('/game/result');
  };

  useEffect(() => {
    dispatch(getQuote());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col justify-around flex-1 w-full h-screen overflow-auto items-center">
      <h1>Game Page</h1>
      <p>{`Username: ${username}`}</p>
      {qoutes && status === 'succeeded' ? <h2>{qoutes.content}</h2> : <h2>Loading...</h2>}
      <button
        type="button"
        onClick={onSubmit}
        className={twMerge(
          'bg-black text-center font-semibold py-1 px-3 w-full rounded-md text-white shadow-sm',
          'hover:bg-red-900 border-gray-300 border uppercase',
        )}
      >
        Submit
      </button>
    </div>
  );
};
