import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/app/app';
import { reducer } from './store/reducer';
import { createAPI } from './services/api';
import { redirectToRoute, requireAuthorization } from './store/action';
import { AuthorizationStatus } from './const';
import { checkAuthAction, fetchFilmsAction } from './store/api-actions';
import { redirect } from './store/middlewares/redirect';
import { AppRoute } from './routes';
import { configureStore } from '@reduxjs/toolkit';

const mainProps = {
  title: 'The Grand Budapest Hotel',
  genre: 'Drama',
  releaseYear: 2014,
};

const api = createAPI(
  () => store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth)),
  () => store.dispatch(redirectToRoute(AppRoute.NotFound)),
);

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});

store.dispatch(checkAuthAction());
store.dispatch(fetchFilmsAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App title={mainProps.title} genre={mainProps.genre} releaseYear={mainProps.releaseYear} />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
