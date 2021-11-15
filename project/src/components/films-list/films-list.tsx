import { memo, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ALL_GENRES_NAME, FILMS_PER_STEP } from '../../const';
import { changeShowedFilms } from '../../store/action';
import { getActiveGenre, getShowedFilms } from '../../store/films-data/selectors';
import { Film } from '../../types/film';
import Card from '../card/card';
import GenresFilter from '../genres-filter/genres-filter';
import ShowMoreButton from '../show-more-button/show-more-button';

type FilmsListProps = {
  className?: string,
  films: Film[],
  title?: string,
  showGenreFilter?: boolean
}

function FilmsList({ className, films, title, showGenreFilter }: FilmsListProps): JSX.Element {
  const showedFilms = useSelector(getShowedFilms);
  const dispatch = useDispatch();

  const activeGenre = useSelector(getActiveGenre);

  const filteredFilms = useMemo(() => {
    if (activeGenre === ALL_GENRES_NAME) {
      return films;
    } else {
      return films.filter((film) => film.genre === activeGenre);
    }
  }, [activeGenre, films]);

  return (
    <section className={className ? `catalog ${className}` : 'catalog'}>
      {title ? <h2 className="catalog__title">{title}</h2> : <h2 className="catalog__title visually-hidden">Catalog</h2>}
      {showGenreFilter && <GenresFilter />}
      <div className="catalog__films-list">
        {filteredFilms.slice(0, showedFilms).map((film) => <Card key={film.id} film={film} />)}
      </div>
      {(showedFilms < filteredFilms.length) && <ShowMoreButton onClick={() => dispatch(changeShowedFilms(showedFilms + FILMS_PER_STEP))} />}
    </section>
  );
}

export default memo(FilmsList);
