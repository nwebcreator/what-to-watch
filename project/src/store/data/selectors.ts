import { ALL_GENRES_NAME, AuthorizationStatus } from '../../const';
import { AuthInfo } from '../../types/auth-info';
import { Film, Films } from '../../types/film';
import { Reviews } from '../../types/review';
import { State } from '../../types/state';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state.authorizationStatus;
export const getFilm = (state: State): Film | undefined => state.film;
export const getFilms = (state: State): Films => state.films;
export const getMyFilms = (state: State): Films => state.favoriteFilms;
export const getReviews = (state: State): Reviews => state.reviews;
export const getShowedFilms = (state: State): number => state.showedFilms;
export const getSimilarFilms = (state: State): Films => state.similarFilms;
export const getLoadedDataStatus = (state: State): boolean => state.isDataLoaded;
export const getGenres = (state: State): string[] => [ALL_GENRES_NAME].concat(Array.from(new Set(state.films.map((film) => film.genre))).sort());
export const getActiveGenre = (state: State): string => state.activeGenre;
export const getAuthInfo = (state: State): AuthInfo | undefined => state.authInfo;
