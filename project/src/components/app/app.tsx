import { Switch, Route } from 'react-router-dom';
import { AppRoute } from '../../routes';
import Main from '../main/main';
import SignIn from '../sign-in/sign-in';
import MyList from '../my-list/my-list';
import MoviePage from '../movie-page/movie-page';
import AddReview from '../add-review/add-review';
import PlayerPage from '../player-page/player-page';
import NotFound from '../not-found/not-found';
import PrivateRoute from '../private-route/private-route';
import LoadingScreen from '../loading-screen/loading-screen';
import { isCheckedAuth } from '../../utils';
import { useSelector } from 'react-redux';
import { getAuthorizationStatus } from '../../store/user-process/selectors';

function App(): JSX.Element {
  const authorizationStatus = useSelector(getAuthorizationStatus);

  if (isCheckedAuth(authorizationStatus)) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <Switch>
      <Route exact path={AppRoute.Root}>
        <Main />
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
        <PlayerPage />
      </Route>
      <Route exact path={AppRoute.NotFound}>
        <NotFound />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default App;
