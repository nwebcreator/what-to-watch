import { ALL_GENRES_NAME } from '../../const';
import { Film, Films } from '../../types/film';
import { Reviews } from '../../types/review';
import { State } from '../../types/state';
import { NameSpace } from '../root-reducer';

export const getFilm = (state: State): Film | undefined => state[NameSpace.Data].film;
export const getPromofilm = (state: State): Film => state[NameSpace.Data].promoFilm || {} as Film;
export const getFilms = (state: State): Films => state[NameSpace.Data].films;
export const getMyFilms = (state: State): Films => state[NameSpace.Data].favoriteFilms;
export const getReviews = (state: State): Reviews => state[NameSpace.Data].reviews;
export const getShowedFilms = (state: State): number => state[NameSpace.Data].showedFilms;
export const getSimilarFilms = (state: State): Films => state[NameSpace.Data].similarFilms.slice(0, 4);
export const getLoadedDataStatus = (state: State): boolean => state[NameSpace.Data].isDataLoaded;
export const getGenres = (state: State): string[] => [ALL_GENRES_NAME].concat(Array.from(new Set(state[NameSpace.Data].films.map((film) => film.genre))).sort().slice(0, 9));
export const getActiveGenre = (state: State): string => state[NameSpace.Data].activeGenre;
