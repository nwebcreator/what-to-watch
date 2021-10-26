import { Film } from './film';

export type State = {
  activeGenre: string,
  sourcedFilms: Film[],
  films: Film[],
};
