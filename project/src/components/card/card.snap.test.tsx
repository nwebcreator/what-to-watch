import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Card from './card';

describe('Component: Card', () => {
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

    const history = createMemoryHistory();
    const { container } = render(
      <Router history={history}>
        <Card film={film} />
      </Router>,
    );
    expect(container).toMatchSnapshot();
  });
});
