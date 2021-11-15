import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AxiosInstance } from 'axios';
import { State } from '../types/state';
import { changeGenre, changeShowedFilms, loadFilms, loadSimilarFilms, loadFilm, redirectToRoute, requireAuthorization, requireLogout, loadReviews, loadFavoriteFilms, loadPromoFilm, updateFilmFavoriteStatus } from '../store/action';

export enum ActionType {
  ChangeGenre = 'wtw/changeGenre',
  LoadFilms = 'wtw/loadFilms',
  LoadFavoriteFilms = 'wtw/loadFavoriteFilms',
  UpdateFilmFavoriteStatus = 'wtw/updateFilmFavoriteStatus',
  LoadReviews = 'wtw/loadReviews',
  LoadSimilarFilms = 'wtw/loadSimilarFilms',
  LoadFilm = 'wtw/loadFilm',
  LoadPromoFilm = 'wtw/loadPromoFilm',
  ChangeShowedFilms = 'wtw/changeShowedFilms',
  RequireAuthorization = 'user/requireAuthorization',
  RequireLogout = 'user/requireLogout',
  RedirectToRoute = 'wtw/redirectToRoute',
}

export type Actions =
  | ReturnType<typeof changeGenre>
  | ReturnType<typeof changeShowedFilms>
  | ReturnType<typeof loadFilms>
  | ReturnType<typeof loadFavoriteFilms>
  | ReturnType<typeof updateFilmFavoriteStatus>
  | ReturnType<typeof loadReviews>
  | ReturnType<typeof loadSimilarFilms>
  | ReturnType<typeof loadFilm>
  | ReturnType<typeof requireAuthorization>
  | ReturnType<typeof requireLogout>
  | ReturnType<typeof redirectToRoute>
  | ReturnType<typeof loadPromoFilm>;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
