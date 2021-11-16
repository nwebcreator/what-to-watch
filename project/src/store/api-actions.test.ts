import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../services/api';
import { checkAuthAction, loginAction, fetchFilmsAction, logoutAction, fetchPromoAction, fetchFavoriteFilmsAction, ApiResponse } from './api-actions';
import { APIRoute, AuthorizationStatus } from '../const';
import { State } from '../types/state';
import { requireAuthorization, redirectToRoute, loadFilms, requireLogout, loadPromoFilm, loadFavoriteFilms } from './action';
import { AuthData } from '../types/auth-data';
import { makeFakeFilm } from '../utils/mocks';
import { AppRoute } from '../routes';
import { AuthInfo } from '../types/auth-info';
import { mapDataToFilm } from '../mappers/film-mapper';

describe('Async actions', () => {
  const onFakeUnauthorized = jest.fn();
  const onFakeNotFound = jest.fn();
  const api = createAPI(onFakeUnauthorized(), onFakeNotFound());
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should authorization status is «auth» when server return 200', async () => {
    const fakeAuthResponse: ApiResponse = { 'id': 0, 'name': 'TestName', 'email': 'test@email.test', 'avatar_url': 'https://test.test/test', 'token': 'secret' };
    const fakeAuthInfo: AuthInfo = { id: 0, name: 'TestName', email: 'test@email.test', avatarUrl: 'https://test.test/test', token: 'secret' };
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Login)
      .reply(200, fakeAuthResponse);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    expect(store.getActions()).toEqual([
      requireAuthorization(AuthorizationStatus.Auth, fakeAuthInfo),
    ]);
  });

  it('should dispatch RequriedAuthorization and RedirectToRoute when POST /login', async () => {
    const fakeUser: AuthData = { login: 'test@test.ru', password: '123456' };
    const fakeAuthResponse: ApiResponse = { 'id': 0, 'name': 'TestName', 'email': 'test@email.test', 'avatar_url': 'https://test.test/test', 'token': 'secret' };
    const fakeAuthInfo: AuthInfo = { id: 0, name: 'TestName', email: 'test@email.test', avatarUrl: 'https://test.test/test', token: 'secret' };
    mockAPI
      .onPost(APIRoute.Login)
      .reply(200, fakeAuthResponse);

    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(fakeUser));

    expect(store.getActions()).toEqual([
      requireAuthorization(AuthorizationStatus.Auth, fakeAuthInfo),
      redirectToRoute(AppRoute.Root),
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith('what-to-watch-token', 'secret');
  });

  it('should dispatch Load_Promo when GET /promo', async () => {
    const mockFilm = makeFakeFilm();
    mockAPI
      .onGet(APIRoute.Promo)
      .reply(200, mockFilm);

    const store = mockStore();
    await store.dispatch(fetchPromoAction());

    expect(store.getActions()).toEqual([
      loadPromoFilm(mapDataToFilm(mockFilm)),
    ]);
  });

  it('should dispatch Load_Films when GET /films', async () => {
    const mockFilms = [makeFakeFilm(), makeFakeFilm()];
    mockAPI
      .onGet(APIRoute.Films)
      .reply(200, mockFilms);

    const store = mockStore();
    await store.dispatch(fetchFilmsAction());

    expect(store.getActions()).toEqual([
      loadFilms(mockFilms.map(mapDataToFilm)),
    ]);
  });

  it('should dispatch Load_Films when GET /favorite', async () => {
    const mockFilms = [makeFakeFilm(), makeFakeFilm()];
    mockAPI
      .onGet(APIRoute.FavoriteFilms)
      .reply(200, mockFilms);

    const store = mockStore();
    await store.dispatch(fetchFavoriteFilmsAction());

    expect(store.getActions()).toEqual([
      loadFavoriteFilms(mockFilms.map(mapDataToFilm)),
    ]);
  });

  it('should dispatch Logout when Delete /logout', async () => {
    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(204);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    expect(store.getActions()).toEqual([requireLogout()]);
    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith('what-to-watch-token');
  });
});
