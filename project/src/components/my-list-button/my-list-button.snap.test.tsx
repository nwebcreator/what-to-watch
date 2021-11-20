import { configureMockStore } from '@jedmao/redux-mock-store';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { AuthorizationStatus } from '../../const';
import { NameSpace } from '../../store/root-reducer';
import MyListButton from './my-list-button';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: GenresFilter', () => {
  test('should render correctly', () => {
    const film = {
      id: 1,
      name: 'string',
      posterImage: 'string',
      previewImage: 'string',
      backgroundImage: 'string',
      backgroundColor: 'string',
      videoLink: 'string',
      previewVideoLink: 'string',
      description: 'string',
      rating: 10,
      scoresCount: 10,
      director: 'string',
      starring: [],
      runTime: 10,
      genre: 'string',
      released: 2010,
      isFavorite: false,
    };

    const store = mockStore({
      [NameSpace.User]: { authorizationStatus: AuthorizationStatus.Auth },
      [NameSpace.Data]: { activeGenre: 'someGenre', films: [film] },
    });

    const { container } = render(
      <Provider store={store}>
        <Router history={history}>
          <MyListButton film={film} />
        </Router>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
