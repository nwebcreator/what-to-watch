import { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppRoute, CreateAppRoute } from '../../routes';
import { redirectToRoute } from '../../store/action';
import { Film } from '../../types/film';
import PreviewVideoPlayer from '../preview-video-player/preview-video-player';

type CardProps = {
  film: Film;
}

function Card({ film }: CardProps): JSX.Element {
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();

  return (
    <article className="small-film-card catalog__films-card" onMouseMove={() => setIsActive(true)} onMouseLeave={() => setIsActive(false)}>
      <div className="small-film-card__image" onClick={() => dispatch(redirectToRoute(CreateAppRoute[AppRoute.Film](film.id)))}>
        {isActive ? <PreviewVideoPlayer src={film.previewVideoLink} poster={film.previewImage} muted autoPlay width="100%" height="auto" /> :
          <img src={film.previewImage} alt={film.name} width="280" height="175" />}
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={CreateAppRoute[AppRoute.Film](film.id)}>{film.name}</Link>
      </h3>
    </article>
  );
}

export default memo(Card);
