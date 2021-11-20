import { configureMockStore } from '@jedmao/redux-mock-store';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import { NameSpace } from '../../store/root-reducer';
import MyList from './my-list';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: MyList', () => {
  test('should render correctly', () => {
    const store = mockStore({
      [NameSpace.User]: { authorizationStatus: AuthorizationStatus.Auth },
      [NameSpace.Data]: { isDataLoaded: true, favoriteFilms: [] },
    });

    const { container } = render(
      <Provider store={store}>
        <Router history={history}>
          <MyList />
        </Router>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
