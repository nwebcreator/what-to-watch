import { AuthorizationStatus } from '../const';
import { AppRoute } from '../routes';
import { ActionType } from '../types/action';
import { Film, Films } from '../types/film';
import { AuthInfo } from '../types/auth-info';
import { Reviews } from '../types/review';
import { createAction } from '@reduxjs/toolkit';

export const changeGenre = createAction(
  ActionType.ChangeGenre,
  (genre: string) => ({
    payload: genre,
  }),
);

export const loadFilms = createAction(
  ActionType.LoadFilms,
  (films: Films) => ({
    payload: {
      films,
    },
  }),
);

export const loadFavoriteFilms = createAction(
  ActionType.LoadFavoriteFilms,
  (favoriteFilms: Films) => ({
    payload: {
      favoriteFilms,
    },
  }),
);

export const updateFilmFavoriteStatus = createAction(
  ActionType.UpdateFilmFavoriteStatus,
  (id: number, isFavorite: boolean) => ({
    payload: {
      id,
      isFavorite,
    },
  }),
);

export const loadReviews = createAction(
  ActionType.LoadReviews,
  (reviews: Reviews) => ({
    payload: {
      reviews,
    },
  }),
);

export const loadSimilarFilms = createAction(
  ActionType.LoadSimilarFilms,
  (similarFilms: Films) => ({
    payload: {
      similarFilms,
    },
  }),
);

export const loadPromoFilm = createAction(
  ActionType.LoadPromoFilm,
  (promoFilm: Film) => ({
    payload: {
      promoFilm,
    },
  }),
);

export const loadFilm = createAction(
  ActionType.LoadFilm,
  (film: Film) => ({
    payload: {
      film,
    },
  }),
);

export const changeShowedFilms = createAction(
  ActionType.ChangeShowedFilms,
  (showedFilms: number) => ({
    payload: showedFilms,
  }),
);

export const requireAuthorization = createAction(
  ActionType.RequireAuthorization,
  (authorizationStatus: AuthorizationStatus, authInfo?: AuthInfo) => ({
    payload: {
      authorizationStatus,
      authInfo,
    },
  }),
);

export const requireLogout = createAction(ActionType.RequireLogout);

export const redirectToRoute = createAction(
  ActionType.RedirectToRoute,
  (url: AppRoute | string) => ({
    payload: url,
  }),
);
