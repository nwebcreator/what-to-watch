import { AuthorizationStatus } from '../const';
import { AppRoute } from '../routes';
import { ActionType } from '../types/action';
import { Films } from '../types/film';
import { AuthInfo } from '../types/auth-info';

export const changeGenre = (genre: string) => ({
  type: ActionType.ChangeGenre,
  payload: genre,
} as const);

export const loadFilms = (films: Films) => ({
  type: ActionType.LoadFilms,
  payload: {
    films,
  },
} as const);

export const changeShowedFilms = (showedFilms: number) => ({
  type: ActionType.ChangeShowedFilms,
  payload: showedFilms,
} as const);

export const requireAuthorization = (authorizationStatus: AuthorizationStatus, authInfo?: AuthInfo) => ({
  type: ActionType.RequireAuthorization,
  payload: { authorizationStatus, authInfo },
} as const);

export const requireLogout = () => ({
  type: ActionType.RequireLogout,
} as const);

export const redirectToRoute = (url: AppRoute) => ({
  type: ActionType.RedirectToRoute,
  payload: url,
} as const);
