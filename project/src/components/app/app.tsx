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

type AppProps = {
  title: string,
  genre: string,
  releaseYear: number,
  films: Film[],
}

function App({ title, genre, releaseYear, films }: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.Root}>
          <Main title={title} genre={genre} releaseYear={releaseYear} films={films} />
        </Route>
        <Route exact path={AppRoute.Login}>
          <SignIn />
        </Route>
        <PrivateRoute exact path={AppRoute.MyList} render={() => <MyList films={films} />} authorizationStatus={AuthorizationStatus.NoAuth}></PrivateRoute>
        <Route exact path={AppRoute.Film}>
          <MoviePage films={films} film={films[0]} />
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

export default App;
