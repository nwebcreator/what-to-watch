import { AuthorizationStatus } from '../const';
import { AppRoute } from '../routes';
import { ActionType } from '../types/action';
import { Film, Films } from '../types/film';
import { AuthInfo } from '../types/auth-info';
import { Reviews } from '../types/review';

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

export const loadReviews = (reviews: Reviews) => ({
  type: ActionType.LoadReviews,
  payload: {
    reviews,
  },
} as const);

export const loadSimilarFilms = (similarFilms: Films) => ({
  type: ActionType.LoadSimilarFilms,
  payload: {
    similarFilms,
  },
} as const);

export const loadFilm = (film: Film) => ({
  type: ActionType.LoadFilm,
  paylod: {
    film,
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

export const redirectToRoute = (url: AppRoute | string) => ({
  type: ActionType.RedirectToRoute,
  payload: url,
} as const);
