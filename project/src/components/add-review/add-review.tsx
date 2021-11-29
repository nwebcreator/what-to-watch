import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { AppRoute, CreateAppRoute } from '../../routes';
import { fetchFilmAction } from '../../store/api-actions';
import { getFilm } from '../../store/films-data/selectors';
import AddReviewForm from '../add-review-form/add-review-form';
import LoadingScreen from '../loading-screen/loading-screen';
import Logo from '../logo/logo';
import UserBlock from '../user-block/user-block';

function AddReview(): JSX.Element {
  const id = parseInt(useParams<{ id: string }>().id, 10);
  const film = useSelector(getFilm);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id && id !== film?.id) {
      dispatch(fetchFilmAction(id));
    }
  }, [dispatch, id, film?.id]);

  if (!film) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={film.backgroundImage} alt={film.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <Logo />

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link className="breadcrumbs__link" to={CreateAppRoute[AppRoute.Film](id)}>{film.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <span className="breadcrumbs__link">Add review</span>
              </li>
            </ul>
          </nav>

          <UserBlock />
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={film.posterImage} alt={film.name} width="218" height="327" />
        </div>
      </div>

      <AddReviewForm filmId={film.id} />

    </section>
  );
}

export default AddReview;
