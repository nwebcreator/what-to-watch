import { configureMockStore } from '@jedmao/redux-mock-store';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import { NameSpace } from '../../store/root-reducer';
import UserBlock from './user-block';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: UserBlock', () => {
  it('should render correctly', () => {
    const store = mockStore({
      [NameSpace.User]: { authorizationStatus: AuthorizationStatus.Auth },
    });

    const { container } = render(
      <Provider store={store}>
        <Router history={history}>
          <UserBlock />
        </Router>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
