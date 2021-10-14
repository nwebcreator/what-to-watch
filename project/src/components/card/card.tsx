import { MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';
import { Film } from '../../types/film';

type CardProps = {
  film: Film;
  onMouseMove?: MouseEventHandler<HTMLElement> | undefined;
  onMouseLeave?: MouseEventHandler<HTMLLegendElement> | undefined;
}

function Card({ film, onMouseMove, onMouseLeave }: CardProps): JSX.Element {
  return (
    <article className="small-film-card catalog__films-card" onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
      <div className="small-film-card__image">
        <img src={film.posterUrl} alt={film.title} width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${film.id}`}>{film.title}</Link>
      </h3>
    </article>
  );
}

export default Card;
