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

type AppProps = {
  title: string,
  genre: string,
  releaseYear: number
}

function App({ title, genre, releaseYear }: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.Root}>
          <Main title={title} genre={genre} releaseYear={releaseYear} />
        </Route>
        <Route exact path={AppRoute.Login}>
          <SignIn />
        </Route>
        <PrivateRoute exact path={AppRoute.MyList} render={() => <MyList />} authorizationStatus={AuthorizationStatus.NoAuth}></PrivateRoute>
        <Route exact path={AppRoute.Film}>
          <MoviePage />
        </Route>
        <Route exact path={AppRoute.AddReview}>
          <AddReview />
        </Route>
        <Route exact path={AppRoute.Player}>
          <Player />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
