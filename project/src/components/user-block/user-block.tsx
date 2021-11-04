import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import { logoutAction } from '../../store/api-actions';
import { ThunkAppDispatch } from '../../types/action';
import { State } from '../../types/state';

const mapStateToProps = ({ authorizationStatus, authInfo }: State) => ({
  authorizationStatus,
  authInfo,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  logout() {
    dispatch(logoutAction());
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function UserBlock(props: PropsFromRedux): JSX.Element {
  const { logout, authorizationStatus, authInfo } = props;

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return (
      <ul className="user-block">
        <li className="user-block__item">
          <span className="user-block__link">{authInfo?.email}</span>
        </li>
        <li className="user-block__item">
          <div className="user-block__avatar">
            <img src={authInfo?.avatarUrl ?? 'img/avatar.jpg'} alt="User avatar" width="63" height="63" />
          </div>
        </li>
        <li className="user-block__item">
          <Link className="user-block__link" to="/" onClick={(evt) => {
            evt.preventDefault();
            logout();
          }}
          >Sign out
          </Link>
        </li>
      </ul>
    );
  }

  return (
    <ul className="user-block">
      <Link className="user-block__link" to="/login">Sign in</Link>
    </ul>
  );
}

export default connector(UserBlock);
export { UserBlock };
