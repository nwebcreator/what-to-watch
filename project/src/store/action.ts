import { ActionType } from '../types/action';
import { Film } from '../types/film';

export const changeGenre = (genre: string) => ({
  type: ActionType.ChangeGenre,
  payload: genre,
} as const);

export const storeFilms = (films: Film[]) => ({
  type: ActionType.StoreFilms,
  payload: films,
} as const);

export const changeShowedFilms = (showedFilms: number) => ({
  type: ActionType.ChangeShowedFilms,
  payload: showedFilms,
} as const);
