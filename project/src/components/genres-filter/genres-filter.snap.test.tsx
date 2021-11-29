import { configureMockStore } from '@jedmao/redux-mock-store';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import { NameSpace } from '../../store/root-reducer';
import { Films } from '../../types/film';
import GenresFilter from './genres-filter';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: GenresFilter', () => {
  test('should render correctly', () => {
    const store = mockStore({
      [NameSpace.User]: { authorizationStatus: AuthorizationStatus.Auth },
      [NameSpace.Data]: { activeGenre: 'someGenre', films: [{ id: 1, genre: 'someGenreu' }] as Films },
    });

    const { container } = render(
      <Provider store={store}>
        <Router history={history}>
          <GenresFilter />
        </Router>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
