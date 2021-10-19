import { MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';
import { Film } from '../../types/film';
import VideoPlayer from '../video-player/video-player';

type CardProps = {
  film: Film;
  isActive?: boolean;
  onMouseMove?: MouseEventHandler<HTMLElement> | undefined;
  onMouseLeave?: MouseEventHandler<HTMLLegendElement> | undefined;
}

function Card({ film, isActive, onMouseMove, onMouseLeave }: CardProps): JSX.Element {
  return (
    <article className="small-film-card catalog__films-card" onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
      <div className="small-film-card__image">
        {isActive ? <VideoPlayer src={film.previewVideoLink} poster={film.previewImage} muted autoPlay width="254" height="175"></VideoPlayer> :
          <img src={film.previewImage} alt={film.name} width="280" height="175" />}
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`/films/${film.id}`}>{film.name}</Link>
      </h3>
    </article>
  );
}

export default Card;
