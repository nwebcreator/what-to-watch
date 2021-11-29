import { AuthorizationStatus } from '../const';
import { RootState } from '../store/root-reducer';
import { AuthInfo } from './auth-info';
import { Film, Films } from './film';
import { Reviews } from './review';

export type FilmsData = {
  activeGenre: string,
  films: Films,
  favoriteFilms: Films,
  film?: Film,
  promoFilm?: Film,
  reviews: Reviews,
  similarFilms: Films,
  showedFilms: number,
  isDataLoaded: boolean,
};

export type UserProcess = {
  authorizationStatus: AuthorizationStatus,
  authInfo?: AuthInfo,
};

export type State = RootState;
