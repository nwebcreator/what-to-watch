import { Switch, Route, Router as BrowserRouter } from 'react-router-dom';
import { AppRoute } from '../../routes';
import Main from '../main/main';
import SignIn from '../sign-in/sign-in';
import MyList from '../my-list/my-list';
import MoviePage from '../movie-page/movie-page';
import AddReview from '../add-review/add-review';
import Player from '../player/player';
import NotFound from '../not-found/not-found';
import PrivateRoute from '../private-route/private-route';
import LoadingScreen from '../loading-screen/loading-screen';
import { isCheckedAuth } from '../../utils';
import browserHistory from '../../browser-history';
import { useSelector } from 'react-redux';
import { getAuthorizationStatus, getLoadedDataStatus } from '../../store/data/selectors';

type AppProps = {
  title: string,
  genre: string,
  releaseYear: number,
}

function App(props: AppProps): JSX.Element {
  const { title, genre, releaseYear } = props;

  const authorizationStatus = useSelector(getAuthorizationStatus);
  const isDataLoaded = useSelector(getLoadedDataStatus);

  if (isCheckedAuth(authorizationStatus) || !isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path={AppRoute.Root}>
          <Main title={title} genre={genre} releaseYear={releaseYear} />
        </Route>
        <Route exact path={AppRoute.Login}>
          <SignIn />
        </Route>
        <PrivateRoute exact path={AppRoute.MyList} render={() => <MyList />}></PrivateRoute>
        <Route exact path={AppRoute.Film}>
          <MoviePage />
        </Route>
        <Route exact path={AppRoute.AddReview}>
          <AddReview />
        </Route>
        <Route exact path={AppRoute.Player}>
          <Player />
        </Route>
        <Route exact path={AppRoute.NotFound}>
          <NotFound />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
