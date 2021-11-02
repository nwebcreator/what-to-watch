import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AxiosInstance } from 'axios';
import { State } from '../types/state';
import { changeGenre, changeShowedFilms, loadFilms, redirectToRoute, requireAuthorization, requireLogout } from '../store/action';

export enum ActionType {
  ChangeGenre = 'wtw/changeGenre',
  LoadFilms = 'wtw/loadFilms',
  ChangeShowedFilms = 'wtw/changeShowedFilms',
  RequireAuthorization = 'user/requireAuthorization',
  RequireLogout = 'user/requireLogout',
  RedirectToRoute = 'game/redirectToRoute',
}

export type ChangeShowedFilmsAction = {
  type: ActionType.ChangeShowedFilms;
  payload: number;
}

export type Actions =
  | ReturnType<typeof changeGenre>
  | ReturnType<typeof changeShowedFilms>
  | ReturnType<typeof loadFilms>
  | ReturnType<typeof requireAuthorization>
  | ReturnType<typeof requireLogout>
  | ReturnType<typeof redirectToRoute>;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
