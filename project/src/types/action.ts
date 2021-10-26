import { Film } from './film';

export enum ActionType {
  ChangeGenre = 'wtw/changeGenre',
  StoreFilms = 'wtw/storeFilms',
}

export type ChangeGenreAction = {
  type: ActionType.ChangeGenre;
  payload: string;
};

export type StoreFilmsAction = {
  type: ActionType.StoreFilms;
  payload: Film[];
};

export type Actions = ChangeGenreAction | StoreFilmsAction;
