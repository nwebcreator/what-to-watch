import { formatStarring } from '../../utils';
import { Film } from '../../types/film';
import { useMemo } from 'react';

type TabOverviewProps = {
  film: Film;
}

function TabOverview({ film }: TabOverviewProps): JSX.Element {
  const levelDescription = useMemo(() => {
    if (film.rating < 3) {
      return 'Bad';
    }
    if (film.rating < 5) {
      return 'Normal';
    }
    if (film.rating < 8) {
      return 'Good';
    }
    if (film.rating < 10) {
      return 'Very good';
    }
    return 'Awesome';
  }, [film.rating]);
  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{film.rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{levelDescription}</span>
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
