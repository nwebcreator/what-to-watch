import { createReducer } from '@reduxjs/toolkit';
import { ALL_GENRES_NAME } from '../../const';
import { FilmsData } from '../../types/state';
import { changeGenre, changeShowedFilms, loadFavoriteFilms, loadFilm, loadFilms, loadPromoFilm, loadReviews, loadSimilarFilms, updateFilmFavoriteStatus } from '../action';

const initialState: FilmsData = {
  activeGenre: ALL_GENRES_NAME,
  films: [],
  favoriteFilms: [],
  reviews: [],
  similarFilms: [],
  film: undefined,
  promoFilm: undefined,
  showedFilms: 0,
  isDataLoaded: false,
};

const filmsData = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      state.activeGenre = action.payload;
    })
    .addCase(loadFilms, (state, action) => {
      state.films = action.payload.films;
      state.isDataLoaded = true;
    })
    .addCase(loadFavoriteFilms, (state, action) => {
      state.favoriteFilms = action.payload.favoriteFilms;
      state.isDataLoaded = true;
    })
    .addCase(loadFilm, (state, action) => {
      state.film = action.payload.film;
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
    .addCase(loadPromoFilm, (state, action) => {
      state.promoFilm = action.payload.promoFilm;
    })
    .addCase(changeShowedFilms, (state, action) => {
      state.showedFilms = action.payload;
    });
});

export { filmsData };
