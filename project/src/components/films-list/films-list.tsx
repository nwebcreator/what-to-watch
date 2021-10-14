import { useState } from 'react';
import { Film } from '../../types/film';
import Card from '../card/card';

type FilmsListProps = {
  films: Film[],
}

function FilmsList({ films }: FilmsListProps): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeFilmId, setActiveFilmId] = useState('');

  return (
    <div className="catalog__films-list">
      {films.map((film) => <Card key={film.id} film={film} onMouseMove={() => setActiveFilmId(film.id)} onMouseLeave={() => setActiveFilmId('')} />)}
    </div>
  );
}

export default FilmsList;
