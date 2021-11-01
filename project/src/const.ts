export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const FILMS_PER_STEP = 8;

export const ALL_GENRES_NAME = 'All genres';

export enum APIRoute {
  Films = '/films',
  Login = '/login',
  Logout = '/logout',
}
