import { AuthorizationStatus } from '../const';
import { Films } from './film';

export type State = {
  activeGenre: string,
  sourcedFilms: Films,
  films: Films,
  showedFilms: number,
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean,
};
