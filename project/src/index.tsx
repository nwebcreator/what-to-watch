import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router as BrowserRouter } from 'react-router-dom';
import App from './components/app/app';
import { createAPI } from './services/api';
import { redirectToRoute, requireAuthorization } from './store/action';
import { AuthorizationStatus } from './const';
import { checkAuthAction } from './store/api-actions';
import { redirect } from './store/middlewares/redirect';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppRoute } from './routes';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './store/root-reducer';
import browserHistory from './browser-history';

import './assets/css/main.css';

const api = createAPI(
  () => store.dispatch(requireAuthorization(AuthorizationStatus.NoAuth)),
  () => store.dispatch(redirectToRoute(AppRoute.NotFound)),
);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});

store.dispatch(checkAuthAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter history={browserHistory}>
        <ToastContainer />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
