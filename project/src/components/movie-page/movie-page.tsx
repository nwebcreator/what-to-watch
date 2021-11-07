import { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import { fetchFilmAction, fetchReviewsAction, fethcSimilarFilmsAction } from '../../store/api-actions';
import { ThunkAppDispatch } from '../../types/action';
import { State } from '../../types/state';
import FilmsList from '../films-list/films-list';
import LoadingScreen from '../loading-screen/loading-screen';
import Logo from '../logo/logo';
import Tabs from '../tabs/tabs';
import UserBlock from '../user-block/user-block';

const mapStateToProps = ({ film, reviews, similarFilms, authorizationStatus }: State) => ({
  film,
  reviews,
  similarFilms,
  authorizationStatus,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  fetchFilm(id: number) {
    dispatch(fetchFilmAction(id));
  },
  fetchSimilarFilms(id: number) {
    dispatch(fethcSimilarFilmsAction(id));
  },
  fetchReviews(id: number) {
    dispatch(fetchReviewsAction(id));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux;

function MoviePage({ film, similarFilms, reviews, authorizationStatus, fetchFilm, fetchSimilarFilms, fetchReviews }: ConnectedComponentProps): JSX.Element {
  const id = parseInt(useParams<{ id: string }>().id, 10);

  useEffect(() => {
    fetchFilm(id);
  }, [fetchFilm, id]);

  useEffect(() => {
    fetchSimilarFilms(id);
  }, [fetchSimilarFilms, id]);

  useEffect(() => {
    fetchReviews(id);
  }, [fetchReviews, id]);

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
              <button className="btn btn--play film-card__button" type="button">
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </button>
              {authorizationStatus === AuthorizationStatus.Auth &&
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>}

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
      <section className="catalog catalog--like-this">
        <h2 className="catalog__title">More like this</h2>

        <FilmsList films={similarFilms.filter((it) => it.id !== id)} />
      </section>

      <footer className="page-footer">
        <Logo isCenter />

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div></>
  );
}

export { MoviePage };
export default connector(MoviePage);
