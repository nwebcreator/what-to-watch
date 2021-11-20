import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FILMS_PER_STEP } from '../../const';
import { changeShowedFilms } from '../../store/action';
import { fetchFavoriteFilmsAction } from '../../store/api-actions';
import { getLoadedDataStatus, getMyFilms } from '../../store/films-data/selectors';
import FilmsList from '../films-list/films-list';
import Logo from '../logo/logo';
import UserBlock from '../user-block/user-block';


function MyList(): JSX.Element {
  const isDataLoaded = useSelector(getLoadedDataStatus);
  const favoriteFilms = useSelector(getMyFilms);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isDataLoaded) {
      dispatch(fetchFavoriteFilmsAction());
    }
  }, [dispatch, isDataLoaded]);

  useEffect(() => {
    dispatch(changeShowedFilms(FILMS_PER_STEP));
  }, [dispatch]);

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />

        <h1 className="page-title user-page__title">My list</h1>

        <UserBlock />
      </header>

      <FilmsList films={favoriteFilms} />

      <footer className="page-footer">
        <Logo isCenter />

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
}

export default MyList;
