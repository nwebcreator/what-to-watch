import { ALL_GENRES_NAME } from '../../const';
import { Film, Films } from '../../types/film';
import { Reviews } from '../../types/review';
import { State } from '../../types/state';
import { NameSpace } from '../root-reducer';

export const getFilm = (state: State): Film | undefined => state[NameSpace.data].film;
export const getPromofilm = (state: State): Film => state[NameSpace.data].promoFilm || {} as Film;
export const getFilms = (state: State): Films => state[NameSpace.data].films;
export const getMyFilms = (state: State): Films => state[NameSpace.data].favoriteFilms;
export const getReviews = (state: State): Reviews => state[NameSpace.data].reviews;
export const getShowedFilms = (state: State): number => state[NameSpace.data].showedFilms;
export const getSimilarFilms = (state: State): Films => state[NameSpace.data].similarFilms;
export const getLoadedDataStatus = (state: State): boolean => state[NameSpace.data].isDataLoaded;
export const getGenres = (state: State): string[] => [ALL_GENRES_NAME].concat(Array.from(new Set(state[NameSpace.data].films.map((film) => film.genre))).sort());
export const getActiveGenre = (state: State): string => state[NameSpace.data].activeGenre;
