import { Dispatch, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { FILMS_PER_STEP } from '../../const';
import { changeShowedFilms } from '../../store/action';
import { Actions } from '../../types/action';
import { Film } from '../../types/film';
import { State } from '../../types/state';
import Card from '../card/card';
import ShowMoreButton from '../show-more-button/show-more-button';

type FilmsListProps = {
  films: Film[],
}

const mapStateToProps = ({ showedFilms }: State) => ({
  showedFilms,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onChangeShowedFilms(showedFilms: number) {
    dispatch(changeShowedFilms(showedFilms));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & FilmsListProps;

function FilmsList({ films, showedFilms, onChangeShowedFilms }: ConnectedComponentProps): JSX.Element {
  const [activeFilmId, setActiveFilmId] = useState<number | undefined>(undefined);

  return (
    <>
      <div className="catalog__films-list">
        {films.slice(0, showedFilms).map((film) => <Card key={film.id} film={film} isActive={activeFilmId === film.id} onMouseMove={() => setActiveFilmId(film.id)} onMouseLeave={() => setActiveFilmId(undefined)} />)}
      </div>
      {(showedFilms < films.length) && <ShowMoreButton onClick={() => onChangeShowedFilms(showedFilms + FILMS_PER_STEP)}/>}
    </>
  );
}

export { FilmsList };
export default connector(FilmsList);
