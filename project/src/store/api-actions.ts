import { ThunkActionResult } from '../types/action';
import { loadFilms, redirectToRoute, requireAuthorization, requireLogout } from './action';
import { saveToken, dropToken } from '../services/token';
import { APIRoute, AuthorizationStatus } from '../const';
import { AuthData } from '../types/auth-data';
import { AppRoute } from '../routes';
import { mapDataToFilms } from '../mappers/film-mapper';
import { mapDataToAuthInfo } from '../mappers/auth-info-mapper';

export const fetchFilmsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<{ [key: string]: unknown }[]>(APIRoute.Films);
    dispatch(loadFilms(mapDataToFilms(data)));
  };

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const { data } = await api.get<{ [key: string]: unknown }>(APIRoute.Login);
    const authInfo = mapDataToAuthInfo(data);
    const authorizationStatus = authInfo ? AuthorizationStatus.Auth : AuthorizationStatus.NoAuth;
    dispatch(requireAuthorization(authorizationStatus, authInfo));
  };

export const loginAction = ({ login: email, password }: AuthData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const { data } = await api.post<{ [key: string]: unknown }>(APIRoute.Login, { email, password });
    const authInfo = mapDataToAuthInfo(data);
    if (authInfo) {
      saveToken(authInfo.token);
      dispatch(requireAuthorization(AuthorizationStatus.Auth, authInfo));
    }

    dispatch(redirectToRoute(AppRoute.Root));
  };


export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireLogout());
  };
