import { useState } from 'react';
import { Film } from '../../types/film';
import Card from '../card/card';

type FilmsListProps = {
  films: Film[],
}

function FilmsList({ films }: FilmsListProps): JSX.Element {
  const [activeFilmId, setActiveFilmId] = useState<number | undefined>(undefined);

  return (
    <div className="catalog__films-list">
      {films.map((film) => <Card key={film.id} film={film} isActive={activeFilmId === film.id} onMouseMove={() => setActiveFilmId(film.id)} onMouseLeave={() => setActiveFilmId(undefined)} />)}
    </div>
  );
}

export default FilmsList;
