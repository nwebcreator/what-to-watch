import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import { AppRoute } from '../../routes';
import { logoutAction } from '../../store/api-actions';
import { getAuthInfo, getAuthorizationStatus } from '../../store/user-process/selectors';

function UserBlock(): JSX.Element {
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const authInfo = useSelector(getAuthInfo);
  const dispatch = useDispatch();

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return (
      <ul className="user-block">
        <li className="user-block__item">
          <div className="user-block__avatar">
            <Link to={AppRoute.MyList}>
              <img src={authInfo?.avatarUrl ?? 'img/avatar.jpg'} alt="User avatar" width="63" height="63" />
            </Link>
          </div>
        </li>
        <li className="user-block__item">
          <button className="user-block__link" style={{ border: 'none', background: 'none' }} onClick={() => dispatch(logoutAction())}>Sign out</button>
        </li>
      </ul>
    );
  }

  return (
    <ul className="user-block">
      <Link className="user-block__link" to={AppRoute.Login}>Sign in</Link>
    </ul>
  );
}

export default UserBlock;
