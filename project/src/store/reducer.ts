import { createReducer } from '@reduxjs/toolkit';
import { ALL_GENRES_NAME, AuthorizationStatus } from '../const';
import { State } from '../types/state';
import { changeGenre, changeShowedFilms, loadFavoriteFilms, loadFilm, loadFilms, loadReviews, loadSimilarFilms, requireAuthorization, requireLogout } from './action';

const initialState: State = {
  activeGenre: ALL_GENRES_NAME,
  films: [],
  favoriteFilms: [],
  reviews: [],
  similarFilms: [],
  film: undefined,
  showedFilms: 0,
  authorizationStatus: AuthorizationStatus.Unknown,
  authInfo: undefined,
  isDataLoaded: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      state.activeGenre = action.payload;
    })
    .addCase(loadFilms, (state, action) => {
      state.films = action.payload.films;
      state.isDataLoaded = true;
    })
    .addCase(loadFavoriteFilms, (state, action) => {
      state.favoriteFilms = action.payload.films;
    })
    .addCase(loadSimilarFilms, (state, action) => {
      state.similarFilms = action.payload.similarFilms;
    })
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload.reviews;
    })
    .addCase(loadFilm, (state, action) => {
      state.film = action.payload.film;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload.authorizationStatus;
      state.authInfo = action.payload.authInfo;
    })
    .addCase(requireLogout, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
      state.authInfo = undefined;
    })
    .addCase(changeShowedFilms, (state, acion) => {
      state.showedFilms = acion.payload;
    });
});

export { reducer };
