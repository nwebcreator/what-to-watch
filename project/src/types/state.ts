import { AuthorizationStatus } from '../const';
import { Films } from './film';
import { AuthInfo  } from './auth-info';

export type State = {
  activeGenre: string,
  sourcedFilms: Films,
  films: Films,
  showedFilms: number,
  authorizationStatus: AuthorizationStatus,
  authInfo?: AuthInfo,
  isDataLoaded: boolean,
};
