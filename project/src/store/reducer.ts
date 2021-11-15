import { createReducer } from '@reduxjs/toolkit';
import { ALL_GENRES_NAME, AuthorizationStatus } from '../const';
import { State } from '../types/state';
import { changeGenre, changeShowedFilms, loadFavoriteFilms, loadFilm, loadFilms, loadPromoFilm, loadReviews, loadSimilarFilms, requireAuthorization, requireLogout, updateFilmFavoriteStatus } from './action';

const initialState: State = {
  activeGenre: ALL_GENRES_NAME,
  films: [],
  favoriteFilms: [],
  reviews: [],
  similarFilms: [],
  film: undefined,
  promoFilm: undefined,
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
    .addCase(updateFilmFavoriteStatus, (state, action) => {
      if (state.film?.id === action.payload.id) {
        state.film.isFavorite = action.payload.isFavorite;
      }

      if (state.promoFilm?.id === action.payload.id) {
        state.promoFilm.isFavorite = action.payload.isFavorite;
      }
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
    .addCase(loadPromoFilm, (state, action) => {
      state.promoFilm = action.payload.promoFilm;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload.authorizationStatus;
      state.authInfo = action.payload.authInfo;
    })
    .addCase(requireLogout, (state) => {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
      state.authInfo = undefined;
    })
    .addCase(changeShowedFilms, (state, action) => {
      state.showedFilms = action.payload;
    });
});

export { reducer };
