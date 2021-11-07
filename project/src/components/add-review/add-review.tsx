import { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppRoute } from '../../routes';
import { redirectToRoute } from '../../store/action';
import { addReviewAction, fetchFilmAction } from '../../store/api-actions';
import { ThunkAppDispatch } from '../../types/action';
import { AddReview as AddReviewModel } from '../../types/add-review';
import { State } from '../../types/state';
import AddReviewForm from '../add-review-form/add-review-form';
import LoadingScreen from '../loading-screen/loading-screen';
import Logo from '../logo/logo';
import UserBlock from '../user-block/user-block';

const mapStateToProps = ({ film }: State) => ({
  film,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  fetchFilm(id: number) {
    dispatch(fetchFilmAction(id));
  },
  addReview(id: number, review: AddReviewModel) {
    dispatch(addReviewAction(id, review));
    dispatch(redirectToRoute(`${AppRoute.Film}#reviews`.replace(':id', id.toString())));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux;

function AddReview({ film, fetchFilm, addReview }: ConnectedComponentProps): JSX.Element {
  const id = parseInt(useParams<{ id: string }>().id, 10);

  useEffect(() => {
    fetchFilm(id);
  }, [fetchFilm, id]);

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
                <a href="film-page.html" className="breadcrumbs__link">{film.name}</a>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link" href="/#">Add review</a>
              </li>
            </ul>
          </nav>

          <UserBlock />
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={film.posterImage} alt={film.name} width="218" height="327" />
        </div>
      </div>

      <AddReviewForm onSubmit={(review) => addReview(id, review)} />

    </section>
  );
}

export { AddReview };
export default connector(AddReview);
