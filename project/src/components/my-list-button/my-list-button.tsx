import { useDispatch, useSelector } from 'react-redux';
import { AuthorizationStatus } from '../../const';
import { changeFilmFavoriteStatus } from '../../store/api-actions';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { Film } from '../../types/film';

import InListSVG from '../../assets/img/icons/in-list.svg';
import AddSVG from '../../assets/img/icons/add.svg';

type MyListButtonProps = {
  film: Film
}

function MyListButton({ film }: MyListButtonProps): JSX.Element | null {

  const dispatch = useDispatch();
  const authorizationStatus = useSelector(getAuthorizationStatus);

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return (
      <button className="btn btn--list film-card__button" type="button" onClick={() => dispatch(changeFilmFavoriteStatus(film.id, !film.isFavorite))}>
        {film.isFavorite ?
          <img src={InListSVG} alt="In list" />
          :
          <img src={AddSVG} alt="Add" />}
        <span>My list</span>
      </button>
    );
  } else {
    return null;
  }
}

export default MyListButton;
