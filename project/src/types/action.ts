import { ThunkAction } from 'redux-thunk';
import { AxiosInstance } from 'axios';
import { State } from '../types/state';
import { changeGenre, changeShowedFilms, loadFilms, loadSimilarFilms, loadFilm, redirectToRoute, requireAuthorization, requireLogout, loadReviews, loadFavoriteFilms, loadPromoFilm, updateFilmFavoriteStatus } from '../store/action';

export enum ActionType {
  ChangeGenre = 'data/changeGenre',
  LoadFilms = 'data/loadFilms',
  LoadFavoriteFilms = 'data/loadFavoriteFilms',
  UpdateFilmFavoriteStatus = 'data/updateFilmFavoriteStatus',
  LoadReviews = 'data/loadReviews',
  LoadSimilarFilms = 'data/loadSimilarFilms',
  LoadFilm = 'data/loadFilm',
  LoadPromoFilm = 'data/loadPromoFilm',
  ChangeShowedFilms = 'data/changeShowedFilms',
  RequireAuthorization = 'user/requireAuthorization',
  RequireLogout = 'user/requireLogout',
  RedirectToRoute = 'main/redirectToRoute',
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
