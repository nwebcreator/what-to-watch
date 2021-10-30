import { Film } from './film';

export enum ActionType {
  ChangeGenre = 'wtw/changeGenre',
  StoreFilms = 'wtw/storeFilms',
  ChangeShowedFilms = 'wtw/changeShowedFilms',
}

export type ChangeGenreAction = {
  type: ActionType.ChangeGenre;
  payload: string;
};

export type StoreFilmsAction = {
  type: ActionType.StoreFilms;
  payload: Film[];
};

export type ChangeShowedFilmsAction = {
  type: ActionType.ChangeShowedFilms;
  payload: number;
}

export type Actions = ChangeGenreAction | StoreFilmsAction | ChangeShowedFilmsAction;
