import { render } from '@testing-library/react';
import TabOverview from './tab-overview';

describe('Component: TabOverview', () => {
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
    const { container } = render(<TabOverview film={film} />);
    expect(container).toMatchSnapshot();
  });
});
