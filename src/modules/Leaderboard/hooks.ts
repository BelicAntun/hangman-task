import { ThunkDispatch, UnknownAction } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { reset } from 'store/gameSlice';
import { ResultState, getResult, resetResults } from 'store/resultsSlice';
import { UserState } from 'store/userSlice';

export const useLeaderboardPage = () => {
  const navigate = useNavigate();
  const dispatchGame = useDispatch();
  const dispatch: ThunkDispatch<ResultState, void, UnknownAction> = useDispatch();

  const { data: results, status: resultsStatus } = useSelector((state: ResultState) => state.results);
  const { username } = useSelector((state: UserState) => state.user);

  const onSubmit = () => {
    dispatchGame(reset());
    dispatch(resetResults());
    navigate('/game');
  };

  useEffect(() => {
    dispatch(getResult());
  }, [dispatch]);
  return {
    onSubmit,
    results,
    resultsStatus,
    username,
  };
};
