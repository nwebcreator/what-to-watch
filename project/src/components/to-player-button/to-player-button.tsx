import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppRoute, CreateAppRoute } from '../../routes';
import { redirectToRoute } from '../../store/action';

import PlaySVG from '../../assets/img/icons/play-s.svg';

type ToPlayerButtonProps = {
  filmId: number,
};

function ToPlayerButton({ filmId }: ToPlayerButtonProps): JSX.Element {

  const dispatch = useDispatch();
  const toPlayer = useCallback(() => {
    dispatch(redirectToRoute(CreateAppRoute[AppRoute.Player](filmId)));
  }, [dispatch, filmId]);

  return (
    <button className="btn btn--play film-card__button" type="button" onClick={toPlayer}>
      <img src={PlaySVG} alt="Play" />
      <span>Play</span>
    </button>
  );
}

export default ToPlayerButton;
