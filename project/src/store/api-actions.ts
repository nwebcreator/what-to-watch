import { ThunkActionResult } from '../types/action';
import { loadFavoriteFilms, loadFilm, loadFilms, loadPromoFilm, loadReviews, loadSimilarFilms, redirectToRoute, requireAuthorization, requireLogout, updateFilmFavoriteStatus } from './action';
import { saveToken, dropToken } from '../services/token';
import { AuthorizationStatus } from '../const';
import { AuthData } from '../types/auth-data';
import { AppRoute } from '../routes';
import { mapDataToFilm } from '../mappers/film-mapper';
import { mapDataToAuthInfo } from '../mappers/auth-info-mapper';
import { Reviews } from '../types/review';
import { AddReview } from '../types/add-review';
import { toast } from 'react-toastify';

const FETCH_FAIL_MESSAGE = 'Ошибка загрузки данных с сервера. Попробуйте позже.';
const NO_AUTH_FAIL_MESSAGE = 'Не забудьте авторизоваться';
const AUTH_FAIL_MESSAGE = 'При авторизации возникла ошибка. Попробуйте позже.';
const LOGOUT_FAIL_MESSAGE = 'При выходе из системы возникла ошибка. Попробуйте позже.';

type ResponseValueType = string | string[] | number | boolean;
export type ApiResponse = Record<string, ResponseValueType | Record<string, ResponseValueType>>;

export const fetchPromoAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get<ApiResponse>('/promo');
      dispatch(loadPromoFilm(mapDataToFilm(data)));
    } catch {
      toast.error(FETCH_FAIL_MESSAGE);
    }
  };

export const fetchFilmsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get<ApiResponse[]>('/films');
      dispatch(loadFilms(data.map((it) => mapDataToFilm(it))));
    } catch {
      toast.error(FETCH_FAIL_MESSAGE);
    }
  };

export const fetchFavoriteFilmsAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get<ApiResponse[]>('/favorite');
      dispatch(loadFavoriteFilms(data.map((it) => mapDataToFilm(it))));
    } catch {
      toast.error(FETCH_FAIL_MESSAGE);
    }
  };

export const fethcSimilarFilmsAction = (id: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get<ApiResponse[]>(`/films/${id}/similar`);
      dispatch(loadSimilarFilms(data.map((it) => mapDataToFilm(it)).filter((it) => it.id !== id)));
    } catch {
      toast.error(FETCH_FAIL_MESSAGE);
    }
  };

export const fetchReviewsAction = (id: number): ThunkActionResult =>
  async (dispatch, _getSetate, api): Promise<void> => {
    try {
      const { data } = await api.get<Reviews>(`/comments/${id}`);
      dispatch(loadReviews(data));
    }
    catch {
      toast.error(FETCH_FAIL_MESSAGE);
    }
  };

export const fetchFilmAction = (id: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.get<ApiResponse>(`/films/${id}`);
      dispatch(loadFilm(mapDataToFilm(data)));
    } catch {
      toast.error(FETCH_FAIL_MESSAGE);
    }
  };

export const addReviewAction = (id: number, review: AddReview, cb: (isSuccess: boolean) => void): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.post<Reviews>(`/comments/${id}`, review);
      dispatch(loadReviews(data));
      toast.info('Отзыв успешно добавлен');
      cb(true);
    } catch {
      toast.error('Ошибка при отправке отзыва.');
      cb(false);
    }
  };

export const changeFilmFavoriteStatus = (id: number, isFavorite: boolean): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data } = await api.post<ApiResponse>(`/favorite/${id}/${isFavorite ? 1 : 0}`);
      const film = mapDataToFilm(data);
      dispatch(updateFilmFavoriteStatus(film.id, film.isFavorite));
    } catch {
      toast.error(FETCH_FAIL_MESSAGE);
    }
  };

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const { data } = await api.get<ApiResponse>('/login');
      const authInfo = mapDataToAuthInfo(data);
      const authorizationStatus = authInfo ? AuthorizationStatus.Auth : AuthorizationStatus.NoAuth;
      dispatch(requireAuthorization(authorizationStatus, authInfo));
      if (authorizationStatus !== AuthorizationStatus.Auth) {
        toast.info(NO_AUTH_FAIL_MESSAGE);
      }
    } catch {
      toast.info(NO_AUTH_FAIL_MESSAGE);
    }
  };

export const loginAction = ({ email, password }: AuthData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      const { data } = await api.post<ApiResponse>('/login', { email, password });
      const authInfo = mapDataToAuthInfo(data);
      if (authInfo) {
        saveToken(authInfo.token);
        dispatch(requireAuthorization(AuthorizationStatus.Auth, authInfo));
      }

      dispatch(redirectToRoute(AppRoute.Root));
    } catch {
      toast.info(AUTH_FAIL_MESSAGE);
    }
  };

export const logoutAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    try {
      await api.delete('/logout');
      dropToken();
      dispatch(requireLogout());
    } catch {
      toast.error(LOGOUT_FAIL_MESSAGE);
    }
  };
