import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AuthorizationStatus } from '../../const';
import thunk from 'redux-thunk';
import App from './app';
import { AppRoute } from '../../routes';
import { NameSpace } from '../../store/root-reducer';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  [NameSpace.Data]: { isDataLoaded: true, films: [], similarFilms: [], favoriteFilms: [], promoFilm: {name: 'promo test film'}, film: { name: 'test film name', starring: ['test starring', 'second starring'] } },
  [NameSpace.User]: { authorizationStatus: AuthorizationStatus.Auth },
});

const history = createMemoryHistory();
const fakeApp = (
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "Root" when user navigate to "/"', () => {
    history.push(AppRoute.Root);
    render(fakeApp);

    expect(screen.getByText(/promo test film/i)).toBeInTheDocument();
  });

  it('should render "SignIn" when user navigate to "/login"', () => {
    history.push(AppRoute.Login);
    render(fakeApp);

    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it('should render "MyList" when user navigate to "/mylist"', () => {
    history.push(AppRoute.MyList);
    render(fakeApp);

    expect(screen.getByText(/My list/i)).toBeInTheDocument();
  });

  it('should render "Film" when user navigate to "/film/:id"', () => {
    history.push(AppRoute.Film);
    render(fakeApp);

    expect(screen.getByText(/test starring, second starring/i)).toBeInTheDocument();
    expect(screen.getByText(/More like this/i)).toBeInTheDocument();
    expect(screen.getByText(/test film name/i)).toBeInTheDocument();
  });

  it('should render "AddReview" when user navigate to "/films/:id/review"', () => {
    history.push(AppRoute.AddReview);
    render(fakeApp);

    expect(screen.getByText(/test film name/i)).toBeInTheDocument();
    expect(screen.getByText(/Add review/i)).toBeInTheDocument();
  });

  it('should render "Player" when user navigate to "/player/:id"', () => {
    const pauseStub = jest
      .spyOn(HTMLVideoElement.prototype, 'pause')
      .mockImplementation(() => undefined);
    history.push(AppRoute.Player);
    render(fakeApp);

    expect(screen.getByText(/Exit/i)).toBeInTheDocument();
    expect(screen.getByText(/test film name/i)).toBeInTheDocument();
    expect(pauseStub).toHaveBeenCalled();
    pauseStub.mockRestore();
  });

  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');
    render(fakeApp);

    expect(screen.getByText('NOT FOUND')).toBeInTheDocument();
    expect(screen.getByText('Return to main')).toBeInTheDocument();
  });
});
