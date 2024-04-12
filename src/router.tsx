import { PrivateLayout } from 'layouts/PrivateLayout';
import { GamePage } from 'modules/Game';
import { LeaderboardPage } from 'modules/Leaderboard';
import { LoginPage } from 'modules/Login';
import { NotFoundPage } from 'modules/NotFound';
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<LoginPage />} />
      <Route path="/game" element={<PrivateLayout />}>
        <Route index element={<GamePage />} />
        <Route path="result" element={<LeaderboardPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Route>,
  ),
);
