import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { AppRoute } from '../../routes';
import Main from '../main/main';
import SignIn from '../sign-in/sign-in';
import MyList from '../my-list/my-list';
import MoviePage from '../movie-page/movie-page';
import AddReview from '../add-review/add-review';
import Player from '../player/player';
import NotFound from '../not-found/not-found';
import PrivateRoute from '../private-route/private-route';
import { AuthorizationStatus } from '../../const';
import { Film } from '../../types/film';
import { State } from '../../types/state';
import { Dispatch, useEffect } from 'react';
import { Actions } from '../../types/action';
import { storeFilms } from '../../store/action';
import { connect, ConnectedProps } from 'react-redux';
import * as mocks from '../../mocks/films';

type AppProps = {
  title: string,
  genre: string,
  releaseYear: number,
}

const mapStateToProps = ({ films }: State) => ({
  films,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onStoreFilms(films: Film[]) {
    dispatch(storeFilms(films));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & AppProps;

function App(props: ConnectedComponentProps): JSX.Element {
  const { title, genre, releaseYear, films, onStoreFilms } = props;

  useEffect(() => {
    onStoreFilms(mocks.films);
  }, [onStoreFilms]);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.Root}>
          <Main title={title} genre={genre} releaseYear={releaseYear} />
        </Route>
        <Route exact path={AppRoute.Login}>
          <SignIn />
        </Route>
        <PrivateRoute exact path={AppRoute.MyList} render={() => <MyList films={films} />} authorizationStatus={AuthorizationStatus.NoAuth}></PrivateRoute>
        <Route exact path={AppRoute.Film}>
          <MoviePage moreLikeThisFilms={films.slice(0, 4)} films={films} />
        </Route>
        <Route exact path={AppRoute.AddReview}>
          <AddReview film={films[1]} />
        </Route>
        <Route exact path={AppRoute.Player}>
          <Player film={films[2]} />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export { App };
export default connector(App);
