import { configureMockStore } from '@jedmao/redux-mock-store';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import Tabs from './tabs';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: Tabs', () => {
  it('should render correctly', () => {
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

    const store = mockStore();

    const { container } = render(
      <Provider store={store}>
        <Router history={history}>
          <Tabs film={film} reviews={[]} />
        </Router>
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
