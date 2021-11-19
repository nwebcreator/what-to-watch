import Logo from '../logo/logo';
import { memo, useEffect } from 'react';
import UserBlock from '../user-block/user-block';
import FilmsList from '../films-list/films-list';
import { useDispatch, useSelector } from 'react-redux';
import { getFilms, getLoadedDataStatus, getPromofilm } from '../../store/films-data/selectors';
import { changeShowedFilms } from '../../store/action';
import { FILMS_PER_STEP } from '../../const';
import MyListButton from '../my-list-button/my-list-button';
import ToPlayerButton from '../to-player-button/to-player-button';
import { fetchFilmsAction, fetchPromoAction } from '../../store/api-actions';
import LoadingScreen from '../loading-screen/loading-screen';

function Main(): JSX.Element {
  const isDataLoaded = useSelector(getLoadedDataStatus);
  const promoFilm = useSelector(getPromofilm);
  const films = useSelector(getFilms);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPromoAction());
    dispatch(fetchFilmsAction());
    dispatch(changeShowedFilms(FILMS_PER_STEP));
  }, [dispatch]);

  if (!isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }
  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={promoFilm.backgroundImage} alt={promoFilm.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <Logo />

          <UserBlock />
        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={promoFilm.posterImage} alt={`${promoFilm.name} poster`} width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{promoFilm.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{promoFilm.genre}</span>
                <span className="film-card__year">{promoFilm.released}</span>
              </p>

              <div className="film-card__buttons">
                <ToPlayerButton filmId={promoFilm.id} />
                <MyListButton film={promoFilm} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <FilmsList films={films} showGenreFilter />
        <footer className="page-footer">
          <Logo isCenter />

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default memo(Main);
