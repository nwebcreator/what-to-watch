import { ThunkActionResult } from '../types/action';
import { loadFavoriteFilms, loadFilm, loadFilms, loadPromoFilm, loadReviews, loadSimilarFilms, redirectToRoute, requireAuthorization, requireLogout, updateFilmFavoriteStatus } from './action';
import { saveToken, dropToken } from '../services/token';
import { APIRoute, AuthorizationStatus } from '../const';
import { AuthData } from '../types/auth-data';
import { AppRoute } from '../routes';
import { mapDataToFilm } from '../mappers/film-mapper';
import { mapDataToAuthInfo } from '../mappers/auth-info-mapper';
import { Reviews } from '../types/review';
import { AddReview } from '../types/add-review';
import { toast } from 'react-toastify';

const FETCH_FAIL_MESSAGE = 'Ошибка загрузки данных с сервера. Попробуйте позже.';
const AUTH_FAIL_MESSAGE = 'Не забудьте авторизоваться';
const ADD_REVIEW_FAIL_MESSAGE = 'Ошибка при отправке отзыва. Попробуйте позже.';

type ResponseValueType = string | string[] | number | boolean;
export type ApiResponse = Record<string, ResponseValueType | Record<string, ResponseValueType>>;

export const fetchPromoAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get<ApiResponse>(APIRoute.Promo);
      dispatch(loadPromoFilm(mapDataToFilm(data)));
    } catch {
      toast.error(FETCH_FAIL_MESSAGE);
    }
  };

export const fetchFilmsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get<ApiResponse[]>(APIRoute.Films);
      dispatch(loadFilms(data.map((it) => mapDataToFilm(it))));
    } catch {
      toast.error(FETCH_FAIL_MESSAGE);
    }
  };

export const fetchFavoriteFilmsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get<ApiResponse[]>(APIRoute.FavoriteFilms);
      dispatch(loadFavoriteFilms(data.map((it) => mapDataToFilm(it))));
    } catch {
      toast.error(FETCH_FAIL_MESSAGE);
    }
  };

export const fethcSimilarFilmsAction = (id: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get<ApiResponse[]>(APIRoute.SimilarFilms.replace('{id}', id.toString()));
      dispatch(loadSimilarFilms(data.map((it) => mapDataToFilm(it)).filter((it) => it.id !== id)));
    } catch {
      toast.error(FETCH_FAIL_MESSAGE);
    }
  };

export const fetchReviewsAction = (id: number): ThunkActionResult =>
  async (dispatch, _getSetate, api): Promise<void> => {
    try {
      const { data } = await api.get<Reviews>(APIRoute.FilmReviews.replace('{id}', id.toString()));
      dispatch(loadReviews(data));
    }
    catch {
      toast.error(FETCH_FAIL_MESSAGE);
    }
  };

export const fetchFilmAction = (id: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get<ApiResponse>(`${APIRoute.Films}/${id}`);
      dispatch(loadFilm(mapDataToFilm(data)));
    } catch {
      toast.error(FETCH_FAIL_MESSAGE);
    }
  };

export const addReviewAction = (id: number, review: AddReview): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.post<Reviews>(APIRoute.FilmReviews.replace('{id}', id.toString()), review);
      dispatch(loadReviews(data));
      dispatch(redirectToRoute(`${AppRoute.Film}#reviews`.replace(':id', id.toString())));
    } catch {
      toast.error(ADD_REVIEW_FAIL_MESSAGE);
    }
  };

export const changeFilmFavoriteStatus = (id: number, isFavorite: boolean): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.post<ApiResponse>(APIRoute.FavoriteStatus.replace('{id}', id.toString()).replace('{status}', isFavorite ? '1' : '0'));
      const film = mapDataToFilm(data);
      dispatch(updateFilmFavoriteStatus(film.id, film.isFavorite));
    } catch {
      toast.error(FETCH_FAIL_MESSAGE);
    }
  };

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const { data } = await api.get<ApiResponse>(APIRoute.Login);
      const authInfo = mapDataToAuthInfo(data);
      const authorizationStatus = authInfo ? AuthorizationStatus.Auth : AuthorizationStatus.NoAuth;
      dispatch(requireAuthorization(authorizationStatus, authInfo));
      if (authorizationStatus !== AuthorizationStatus.Auth) {
        toast.info(AUTH_FAIL_MESSAGE);
      }
    } catch {
      toast.info(AUTH_FAIL_MESSAGE);
    }
  };

export const loginAction = ({ login: email, password }: AuthData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const { data } = await api.post<ApiResponse>(APIRoute.Login, { email, password });
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
