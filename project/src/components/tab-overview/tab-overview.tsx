import { formatStarring } from '../../utils';
import { Film } from '../../types/film';

type TabOverviewProps = {
  film: Film;
}

function TabOverview({ film }: TabOverviewProps): JSX.Element {
  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{film.rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">Very good</span>
          <span className="film-rating__count">{film.scoresCount} ratings</span>
        </p>
      </div>

      <div className="film-card__text">
        <p>{film.description}</p>

        <p className="film-card__director"><strong>Director: {film.director}</strong></p>
        <p className="film-card__starring"><strong>Starring: {formatStarring(film.starring)}</strong></p>
      </div>
    </>);
}

export default TabOverview;
