import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppRoute, CreateAppRoute } from '../../routes';
import { redirectToRoute } from '../../store/action';

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
      <svg viewBox="0 0 19 19" width="19" height="19">
        <use xlinkHref="#play-s"></use>
      </svg>
      <span>Play</span>
    </button>
  );
}

export default ToPlayerButton;
