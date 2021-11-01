import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutAction } from '../../store/api-actions';
import { ThunkAppDispatch } from '../../types/action';

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  logout() {
    dispatch(logoutAction());
  },
});

const connector = connect(null, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function UserBlock(props: PropsFromRedux): JSX.Element {
  const { logout } = props;
  return (
    <ul className="user-block">
      <li className="user-block__item">
        <div className="user-block__avatar">
          <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
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

export default connector(UserBlock);
export { UserBlock };
