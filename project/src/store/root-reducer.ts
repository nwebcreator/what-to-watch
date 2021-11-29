import { combineReducers } from 'redux';
import { filmsData } from './films-data/films-data';
import { userProcess } from './user-process/user-process';

export enum NameSpace {
  Data = 'DATA',
  User = 'USER',
}

export const rootReducer = combineReducers({
  [NameSpace.Data]: filmsData,
  [NameSpace.User]: userProcess,
});

export type RootState = ReturnType<typeof rootReducer>;
