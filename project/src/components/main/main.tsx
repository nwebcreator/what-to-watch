import Logo from '../logo/logo';
import { memo, useEffect } from 'react';
import UserBlock from '../user-block/user-block';
import FilmsList from '../films-list/films-list';
import { useDispatch, useSelector } from 'react-redux';
import { getFilms } from '../../store/data/selectors';
import { changeShowedFilms } from '../../store/action';
import { FILMS_PER_STEP } from '../../const';

type MainProps = {
  title: string,
  genre: string,
  releaseYear: number
}

function Main(props: MainProps): JSX.Element {
  const { title, genre, releaseYear } = props;

  const films = useSelector(getFilms);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changeShowedFilms(FILMS_PER_STEP));
  }, [dispatch]);

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <Logo />

          <UserBlock />
        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218" height="327" />
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{title}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{genre}</span>
                <span className="film-card__year">{releaseYear}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                </button>
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
