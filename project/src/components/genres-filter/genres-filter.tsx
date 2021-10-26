import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import { allGenresName } from '../../const';
import { changeGenre } from '../../store/action';
import { Actions } from '../../types/action';
import { State } from '../../types/state';

type GenresFilterProps = {
  genres: string[];
}

const mapStateToProps = ({ activeGenre }: State) => ({
  activeGenre,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>) => ({
  onChangeGenre(genre: string) {
    dispatch(changeGenre(genre));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;
type ConnectedComponentProps = PropsFromRedux & GenresFilterProps;

function GenresFilter(props: ConnectedComponentProps): JSX.Element {
  const { activeGenre, genres, onChangeGenre } = props;

  return (
    <ul className="catalog__genres-list">
      {[allGenresName].concat(genres).map((it) => (
        <li key={it} className={`catalog__genres-item${it === activeGenre ? ' catalog__genres-item--active' : ''}`} onClick={() => onChangeGenre(it)}>
          <a href="/#" className="catalog__genres-link">{it}</a>
        </li>))}
    </ul>
  );
}

export { GenresFilter };
export default connector(GenresFilter);
