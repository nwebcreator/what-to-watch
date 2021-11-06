import { ThunkActionResult } from '../types/action';
import { loadFilm, loadFilms, loadReviews, loadSimilarFilms, redirectToRoute, requireAuthorization, requireLogout } from './action';
import { saveToken, dropToken } from '../services/token';
import { APIRoute, AuthorizationStatus } from '../const';
import { AuthData } from '../types/auth-data';
import { AppRoute } from '../routes';
import { mapDataToFilm } from '../mappers/film-mapper';
import { mapDataToAuthInfo } from '../mappers/auth-info-mapper';
import { Reviews } from '../types/review';
import { AddReview } from '../types/add-review';

export const fetchFilmsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<{ [key: string]: unknown }[]>(APIRoute.Films);
    dispatch(loadFilms(data.map((it) => mapDataToFilm(it))));
  };

export const fethcSimilarFilmsAction = (id: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<{ [key: string]: unknown }[]>(APIRoute.SimilarFilms.replace('{id}', id.toString()));
    dispatch(loadSimilarFilms(data.map((it) => mapDataToFilm(it))));
  };

export const fetchReviewsAction = (id: number): ThunkActionResult =>
  async (dispatch, _getSetate, api): Promise<void> => {
    const { data } = await api.get<Reviews>(APIRoute.FilmReviews.replace('{id}', id.toString()));
    dispatch(loadReviews(data));
  };

export const fetchFilmAction = (id: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const { data } = await api.get<{ [key: string]: unknown }>(`${APIRoute.Films}/${id}`);
    dispatch(loadFilm(mapDataToFilm(data)));
  };

export const addReviewAction = (id: number, review: AddReview): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.post<Reviews>(APIRoute.FilmReviews.replace('{id}', id.toString()), review);
    dispatch(loadReviews(data));
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
