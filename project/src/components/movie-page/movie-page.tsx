import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { AuthorizationStatus, FILMS_PER_STEP } from '../../const';
import { changeShowedFilms } from '../../store/action';
import { fetchFilmAction, fetchReviewsAction, fethcSimilarFilmsAction } from '../../store/api-actions';
import { getFilm, getReviews, getSimilarFilms } from '../../store/films-data/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import FilmsList from '../films-list/films-list';
import LoadingScreen from '../loading-screen/loading-screen';
import Logo from '../logo/logo';
import MyListButton from '../my-list-button/my-list-button';
import Tabs from '../tabs/tabs';
import ToPlayerButton from '../to-player-button/to-player-button';
import UserBlock from '../user-block/user-block';

function MoviePage(): JSX.Element {
  const id = parseInt(useParams<{ id: string }>().id, 10);

  const authorizationStatus = useSelector(getAuthorizationStatus);
  const film = useSelector(getFilm);
  const reviews = useSelector(getReviews);
  const similarFilms = useSelector(getSimilarFilms);

  const dispatch = useDispatch();

  useEffect(() => {
    if (id && id !== film?.id) {
      dispatch(fetchFilmAction(id));
      dispatch(fethcSimilarFilmsAction(id));
      dispatch(fetchReviewsAction(id));
    }
  }, [dispatch, id, film?.id]);

  useEffect(() => {
    dispatch(changeShowedFilms(FILMS_PER_STEP));
  }, [dispatch, id]);

  if (!film) {
    return (
      <LoadingScreen />
    );
  }

  return (<>
    <section className="film-card film-card--full">
      <div className="film-card__hero">
        <div className="film-card__bg">
          <img src={film.backgroundImage} alt={film.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <Logo />

          <UserBlock />
        </header>

        <div className="film-card__wrap">
          <div className="film-card__desc">
            <h2 className="film-card__title">{film.name}</h2>
            <p className="film-card__meta">
              <span className="film-card__genre">{film.genre}</span>
              <span className="film-card__year">{film.released}</span>
            </p>

            <div className="film-card__buttons">
              <ToPlayerButton filmId={film.id} />
              <MyListButton film={film} />

              {authorizationStatus === AuthorizationStatus.Auth && <Link to={`/films/${id}/review`} className="btn film-card__button">Add review</Link>}
            </div>
          </div>
        </div>
      </div>

      <div className="film-card__wrap film-card__translate-top">
        <div className="film-card__info">
          <div className="film-card__poster film-card__poster--big">
            <img src={film.posterImage} alt={film.name} width="218" height="327" />
          </div>
          <Tabs film={film} reviews={reviews}></Tabs>
        </div>
      </div>
    </section>

    <div className="page-content">
      <FilmsList className="catalog--like-this" title="More like this" films={similarFilms} />

      <footer className="page-footer">
        <Logo isCenter />

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div></>
  );
}

export default MoviePage;
